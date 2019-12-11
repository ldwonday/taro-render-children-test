import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';

interface DataCardTitleProps {
  title: string;
  dateRange: moment.Moment[];
}

const DataCardTitle: Taro.FC<DataCardTitleProps> = ({ title, dateRange = [] }) => {
  return (
    <View>
      {title}
    </View>
  );
};

export default DataCardTitle;
