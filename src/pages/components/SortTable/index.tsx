import Taro, { useRef } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import { SortName } from '@/pages/data-insight/type';
import { sortByList } from '@/pages/data-insight/constants';
import { SelectList } from '@/components';
import Table, { TableProps } from '../Table';
import { ReactNode } from 'react';

interface Filter {
  sortBy: string;
  sort: SortName;
}

interface SortTableProps<T> extends TableProps<T> {
  sortList: PopSelectListItem[];
  defaultFilter?: Filter;
  onSortChange: (filter: Partial<Filter>) => void;
  renderTitle: string | ReactNode;
}

const SortTable: Taro.FC<SortTableProps<any>> = props => {
  const { sortList = [], defaultFilter, onSortChange, ...rest } = props;

  const tableRef = useRef(null);

  const handleSortByChange = (value: PopSelectListItem) => {
    onSortChange({ sortBy: String(value.id) });
  };

  const handleSortChange = (value: PopSelectListItem) => {
    onSortChange({ sort: String(value.id) as SortName });
  };

  const filter = defaultFilter || {
    sortBy: String((sortList[0] && sortList[0].id) || ''),
    sort: String(sortByList[0].id) as SortName,
  };

  return (
    <View className="filter-table">
      <View className="table-title">{props.renderTitle}</View>
      <View className="filter">
        <View className="filter-item">
          <SelectList list={sortList} value={filter.sortBy} onSelect={handleSortByChange} />
        </View>
        <View className="filter-item">
          <SelectList list={sortByList} value={filter.sort as string} onSelect={handleSortChange} />
        </View>
      </View>
      <Table {...rest} ref={tableRef} />
    </View>
  );
};

export default SortTable;
