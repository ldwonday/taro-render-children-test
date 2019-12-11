import React from "react";
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

interface SortTableProps {
  renderTitle: string | React.ReactNode;
}

const SortTable: Taro.FC<SortTableProps> = props => {
  return (
    <View className="filter-table">
      <View className="table-title">{props.renderTitle}</View>
    </View>
  );
};

export default SortTable;
