import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import moment from 'moment';
import './index.less';
import { DateSelectText } from '../../constants';
import { getCurrentDateTypeByRange } from '@/pages/data-insight/utils';

interface DataCardTitleProps {
  title: string;
  dateRange: moment.Moment[];
}

const DataCardTitle: Taro.FC<DataCardTitleProps> = ({ title, dateRange = [] }) => {
  return (
    <View>
      {title}
      <Text className="cardTitleDesc">
        （
        {DateSelectText[getCurrentDateTypeByRange(dateRange) as number] ||
        dateRange.map(item => item.format('YYYY-MM-DD')).join('~')}
        ）
      </Text>
    </View>
  );
};

export default DataCardTitle;
