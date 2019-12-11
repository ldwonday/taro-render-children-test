import { DateSelectText, EDateSelect } from './constants';
import moment from 'moment';
import { usePageScroll, useRef } from '@tarojs/taro';
import Table from './components/Table';

export const getDate = (time: EDateSelect) => {
  const endTime = moment(new Date())
    .add(-1, 'day')
    .endOf('day');
  let timeRange;
  switch (time) {
    case EDateSelect.SEVEN_DAYS:
      timeRange = [
        moment(new Date())
          .add(-7, 'day')
          .startOf('day'),
        endTime,
      ];
      break;
    case EDateSelect.ONE_MONTH:
      timeRange = [
        moment(new Date())
          .add(-1, 'month')
          .startOf('day'),
        endTime,
      ];
      break;
    case EDateSelect.THREE_MONTH:
      timeRange = [
        moment(new Date())
          .add(-3, 'month')
          .startOf('day'),
        endTime,
      ];
      break;
    default:
      timeRange = [
        moment(new Date())
          .add(-1, 'day')
          .startOf('day'),
        endTime,
      ];
      break;
  }

  return timeRange;
};

export const getYesterday = () => {
  return [
    moment(new Date())
      .add(-1, 'day')
      .startOf('day'),
    moment(new Date())
      .add(-1, 'day')
      .endOf('day'),
  ];
};

export const useScrollTable = () => {
  const sortTableComponent = useRef();
  usePageScroll(e => {
    if (sortTableComponent.current) {
      const tableRef: Table = sortTableComponent.current.tableRef.current;
      tableRef && tableRef.onPageScroll(e);
    }
  });
  return sortTableComponent;
};

export const getCurrentDateTypeByRange = (range: moment.Moment[] | undefined) => {
  return (
    range &&
    Number(
      Object.values(EDateSelect).find(item => {
        if (typeof item === 'number') {
          const ranges = getDate(item);
          return ranges[0].isSame(range[0], 'day') && ranges[1].isSame(range[1], 'day');
        }
        return false;
      }),
    )
  );
};
