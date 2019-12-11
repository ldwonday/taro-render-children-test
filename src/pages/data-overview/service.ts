import request from '@/utils/request';
import config from '@/config';
import { ISearchParams } from './data.d';
import { DevicesListParams } from '../type';
import { allDevice } from '../constants';
import { getYesterday } from '@/pages/data-insight/utils';

const {
  merchant: { device },
  statistic: { friend },
} = config.api;

export async function listDevice(data: DevicesListParams) {
  return request({
    url: device.list,
    data,
  });
}

// eslint-disable-next-line max-len
const getSameTypeData = (
  { dateRange = getYesterday(), robotNo = allDevice.id, ...rest }: Partial<ISearchParams>,
  url: string,
) => {
  const [dateStart, dateEnd] = dateRange;
  const data = {
    robotNo: robotNo === allDevice.id ? '' : robotNo,
    dateStart: dateStart.format('YYYY-MM-DD'),
    dateEnd: dateEnd.format('YYYY-MM-DD'),
    ...rest,
  };
  if (robotNo === allDevice.id) {
    delete data.robotNo;
  }
  return request({
    url,
    data,
  });
};
export async function overallSum({ sort, sortBy, ...rest }: ISearchParams) {
  return getSameTypeData(rest, friend.overallSum);
}
export async function duration({ sort, sortBy, ...rest }: ISearchParams) {
  return getSameTypeData(rest, friend.duration);
}
export async function overallTop(params: ISearchParams) {
  return getSameTypeData(params, friend.overallTop);
}
