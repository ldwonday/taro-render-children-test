import Taro, { useState } from '@tarojs/taro';
import moment from 'moment'
import { View } from '@tarojs/components';
import SearchHeader from '../components/SearchHeader';
import SortTable from '../components/SortTable';
import { ISearchParams } from './data'
import { SearchHeaderParam } from '../type'
import { allDevice } from '../constants';
import SortTableTitle from '../components/SortTableTitle';
import { getYesterday } from '../utils';
import './index.scss';

const yesterday = getYesterday();

const DataOverview: Taro.FC = props => {
  const [search, setSearch] = useState<ISearchParams>({
    dateRange: yesterday,
    robotNo: allDevice.id,
  });

  const searchHeaderProps = {
    defaultValue: { robotNo: search.robotNo, dateRange: search.dateRange },
    onChange: (values: Partial<SearchHeaderParam>) => {
      setSearch({ ...search, ...values });
    },
  };

  console.log(yesterday[0].format('l'), yesterday[1].format('l'));
  /**
   * SortTableTitle组件如果删除dataRange属性，则上面的日志输出是一致的，如果加上这个属性，则每次的输出都不一致！
   */
  return (
    <View className="page-container">
      <SearchHeader {...searchHeaderProps} />
      <View className="container">
        <SortTable
          renderTitle={<SortTableTitle title="增长数据排行榜" dateRange={search.dateRange} />}
        />
      </View>
    </View>
  );
};

export default DataOverview
