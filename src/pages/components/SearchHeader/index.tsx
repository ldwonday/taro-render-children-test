import Taro, { useState, useCallback } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { DateRange, SelectList } from '@/components';
import { DateSelectText, EDateSelect, allDevice } from '../../constants';
import moment from 'moment';
import './index.scss';
import { SearchHeaderParam } from '../../type';
import { getDate, getCurrentDateTypeByRange } from '../../utils';
import { SelectListProps } from '@/components/SelectList';

interface SearchHeaderProps {
  devices: PopSelectListItem[];
  defaultValue?: SearchHeaderParam;
  isShowDateRange?: boolean;
  onChange: (values: Partial<SearchHeaderParam>) => void;
  onSelectPopVisibleChange?: SelectListProps['onSelectPopVisibleChange'];
}

const SearchHeader: Taro.FC<SearchHeaderProps> = props => {
  const {
    devices = [],
    onChange,
    defaultValue = {
      robotNo: allDevice.id,
      dateRange: getDate(EDateSelect.YESTERDAY),
    },
    isShowDateRange = true,
    onSelectPopVisibleChange,
  } = props;
  const [curDateType, setCurDateType] = useState(getCurrentDateTypeByRange(defaultValue.dateRange));

  const onDateRangeChange = useCallback(
    (range: moment.Moment[]) => {
      setCurDateType(getCurrentDateTypeByRange(range));
      onChange({ dateRange: range });
    },
    [onChange],
  );

  const handleSelectDateType = useCallback(
    (type: EDateSelect) => {
      setCurDateType(type);
      const range = getDate(type);
      onChange({ dateRange: range });
    },
    [onChange],
  );

  const onDevicesChange = useCallback(
    (item: PopSelectListItem) => {
      onChange({ robotNo: item.id });
    },
    [onChange],
  );

  return (
    <View className="searchHeader">
      <View className="selectDevice">
        <SelectList
          isNative
          style={{
            fontWeight: 'bold',
            fontSize: Taro.pxTransform(32),
            color: 'rgba(57,69,78,1)',
          }}
          value={defaultValue.robotNo}
          placeholder="请选择设备"
          list={[allDevice].concat(devices)}
          onSelect={onDevicesChange}
          onSelectPopVisibleChange={onSelectPopVisibleChange}
        />
      </View>
      {isShowDateRange && (
        <Block>
          <View className="selectDate">
            {Object.entries(DateSelectText).map(item => {
              const [k, v] = item;
              return (
                <View
                  key={k}
                  className={`timeItem${curDateType === Number(k) ? ' active' : ''}`}
                  onClick={() => handleSelectDateType(Number(k))}
                >
                  {v}
                </View>
              );
            })}
          </View>
          <DateRange value={defaultValue.dateRange} onChange={onDateRangeChange} />
        </Block>
      )}
      <View className="divider" />
    </View>
  );
};

export default Taro.memo(SearchHeader);
