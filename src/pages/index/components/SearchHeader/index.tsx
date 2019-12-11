import Taro, { useState, useCallback } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { DateSelectText, EDateSelect, allDevice } from '../../constants';
import './index.scss';
import { SearchHeaderParam } from '../../type';
import { getDate, getCurrentDateTypeByRange } from '../../utils';

interface SearchHeaderProps {
  defaultValue?: SearchHeaderParam;
  onChange: (values: Partial<SearchHeaderParam>) => void;
}

const SearchHeader: Taro.FC<SearchHeaderProps> = props => {
  const {
    onChange,
    defaultValue = {
      robotNo: allDevice.id,
      dateRange: getDate(EDateSelect.YESTERDAY),
    },
  } = props;
  const [curDateType, setCurDateType] = useState(getCurrentDateTypeByRange(defaultValue.dateRange));

  const handleSelectDateType = useCallback(
    (type: EDateSelect) => {
      setCurDateType(type);
      const range = getDate(type);
      onChange({ dateRange: range });
    },
    [onChange],
  );

  return (
    <View className="searchHeader">
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
      <View className="divider" />
    </View>
  );
};

export default Taro.memo(SearchHeader);
