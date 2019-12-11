import { EDateSelect } from './constants';
import moment from 'moment';

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
