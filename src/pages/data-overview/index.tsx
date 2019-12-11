import Taro, {
  useEffect,
  usePullDownRefresh,
  useState,
  useMemo,
  usePageScroll,
  useRef,
} from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import numeral from 'numeral';
import { StateType } from './model';
import { ChartDataItem, SearchHeaderParam, SortName } from '../type';
import { IOverSum, ISearchParams } from './data';
import { ColumnType, allDevice, sortByList } from '../constants';
import { DataView, DataViewName } from './constants';
import SearchHeader from '../components/SearchHeader';
import DataTotal from '../components/DataTotal';
import SortTable from '../components/SortTable';
import SortTableTitle from '../components/SortTableTitle';
import Table from '../components/Table';
import action from '@/utils/action';
import { getYesterday } from '../utils';
import './index.scss';
import moment from 'moment';

interface ModelProps {
  loading: {
    effects: { [key: string]: boolean };
  };
  userInfo: UserInfo;
  model: StateType;
}

interface DispatchProps {
  init: (params: ISearchParams) => Promise<void>;
  getData: (params: ISearchParams) => void;
  getOverallTop: (params: ISearchParams) => void;
}

const yesterday = getYesterday();

const mapStateToProps = ({
  loading,
  login,
  dataOverview,
}: {
  login: { userInfo: UserInfo };
  loading: ModelProps['loading'];
  dataOverview: ModelProps['model'];
}) => ({
  model: dataOverview,
  userInfo: login.userInfo,
  loading,
});

const actions = {
  init: 'dataOverview/init',
  getData: 'dataOverview/getData',
  getOverallTop: 'dataOverview/overallTop',
};
const diffYesterday = (dates: moment.Moment[]) =>
  dates[0].isSame(yesterday[0], 'd') && dates[1].isSame(yesterday[1], 'd');

const mapDispatchToProps: DispatchProps = {
  init: params => action(actions.init, params),
  getData: params => action(actions.getData, params),
  getOverallTop: params => action(actions.getOverallTop, params),
};

const DataOverview: Taro.FC<ModelProps & DispatchProps> = props => {
  const { model, loading, userInfo } = props;
  const [chartFilter, setChartFilter] = useState(DataView.totalUserCount);
  const [isSelectPopShow, setIsSelectPopShow] = useState(false);

  const [search, setSearch] = useState<ISearchParams>({
    robotNo: allDevice.id,
    dateRange: getYesterday(),
    sortBy: DataView.totalUserCount,
    sort: sortByList[0].id as SortName,
  });

  useEffect(() => {
    props.init(search);
  }, [userInfo]);

  usePullDownRefresh(() => {
    props.init(search).then(Taro.stopPullDownRefresh);
  });

  const sortTableComponent = useRef();
  usePageScroll(e => {
    if (sortTableComponent.current) {
      const tableRef: Table = sortTableComponent.current.tableRef.current;
      tableRef && tableRef.onPageScroll(e);
    }
  });

  const isYesterday = diffYesterday(search.dateRange);

  const { devices, chartData, overSum, overTop } = model;

  const searchHeaderProps = {
    devices: devices.map(item => ({ id: item.wechatId, name: item.name })),
    defaultValue: { robotNo: search.robotNo, dateRange: search.dateRange },
    onChange: (values: Partial<SearchHeaderParam>) => {
      const isSameYesterday = values.dateRange ? diffYesterday(values.dateRange) : true;
      const filter = { sortBy: search.sortBy, sort: search.sort };
      if (!isSameYesterday) {
        if (search.sortBy === DataView.totalUserCount) {
          filter.sortBy = DataView.newUserCount;
          filter.sort = 'desc';
        }
        if (chartFilter === DataView.totalUserCount) {
          setChartFilter(DataView.newUserCount);
        }
      }
      const params = { ...search, ...values, ...filter };
      console.log(params);
      setSearch(params);
      props.getData(params);
    },
    onSelectPopVisibleChange: setIsSelectPopShow,
  };

  const rangeDatas = useMemo(() => {
    const data = {
      dimensions: { data: [] },
      measures: [{ data: [], name: DataViewName[chartFilter] }],
    } as ChartDataItem;
    const [start, end] = search.dateRange;
    const diff = end.diff(start, 'days') + 1;
    new Array(diff).fill('').forEach((_, index) => {
      const item = moment(start)
        .add(index, 'days')
        .startOf('day')
        .valueOf();
      const cur = chartData.find(cd => {
        return moment(cd.metricsDay).valueOf() === item;
      });
      data.dimensions.data.push(moment(item).format('MM-DD'));
      data.measures[0].data.push((cur && cur[chartFilter]) || 0);
    });
    return data;
  }, [chartData, search.dateRange, chartFilter]);

  const dataTotalData = useMemo(() => {
    const dataMaps = Object.entries(DataViewName).map(([k, v]) => ({
      key: k,
      title: v,
      numeral: k.indexOf('Rate') !== -1 ? numeral(overSum[k] || 0).format('%') : overSum[k] || 0,
    }));
    if (!isYesterday) {
      dataMaps.splice(dataMaps.findIndex(item => item.key === DataView.totalUserCount), 1);
    }
    return dataMaps;
  }, [overSum, isYesterday]);

  const dataTotalProps = {
    defaultValue: chartFilter,
    data: dataTotalData,
    isRate: chartFilter.indexOf('Rate') !== -1,
    chartData: rangeDatas,
    loading: loading.effects[actions.init],
    onFilterChange(filter: string) {
      setChartFilter(filter as DataView);
    },
    isSelectPopShow,
  };

  const sortTableProps = {
    defaultFilter: { sort: search.sort, sortBy: search.sortBy },
    sortList: useMemo(
      () =>
        Object.entries(DataViewName)
          .filter(
            ([key]) =>
              (key !== DataView.totalUserCount || isYesterday) &&
              key !== DataView.initiativeNewUserRate,
          )
          .map(([id, name]) => ({ id, name })),
      [isYesterday],
    ),
    dataSource: overTop,
    loading: loading.effects[actions.init],
    columns: [
      {
        title: '头像',
        dataIndex: 'headImage',
        type: ColumnType.IMAGE,
        span: 2,
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        span: 4,
      },
      {
        title: '微信昵称',
        dataIndex: 'nickName',
        span: 4,
      },
      {
        title: DataViewName[search.sortBy],
        dataIndex: search.sortBy,
        span: 2,
      },
    ],
    isScrollToFixedHeader: true,
    rowKey: (record: IOverSum) => String(record.hash),
    onSortChange: (values: Partial<Pick<ISearchParams, 'sortBy' | 'sort'>>) => {
      const params = { ...search, ...values };
      setSearch(params);
      props.getOverallTop(params);
    },
  };

  return (
    <View className="page-container">
      <SearchHeader {...searchHeaderProps} />
      <View className="container">
        <View className="section-sum-and-chart">
          <DataTotal {...dataTotalProps} />
        </View>
        <SortTable
          {...sortTableProps}
          ref={sortTableComponent}
          renderTitle={<SortTableTitle title="增长数据排行榜" dateRange={search.dateRange} />}
        />
      </View>
    </View>
  );
};

DataOverview.config = {
  enablePullDownRefresh: true,
  backgroundTextStyle: 'dark',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // @ts-ignore
)(DataOverview);
