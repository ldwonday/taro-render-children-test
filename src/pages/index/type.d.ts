import moment from 'moment';

export interface DeviceListItem {
  createTime: string;
  deviceType?: null;
  id: string;
  lastLoginTime: string;
  name: string;
  promotionId: null | number;
  reservePlanId: null | number;
  serialNo: null | number;
  status: null | number;
  tbUserId: null | number;
  userId: number;
  wechatId: string;
  wechatName: string;
  wechatNo: string;
}

export interface SearchHeaderParam {
  robotNo: string | number;
  dateRange?: moment.Moment[];
}

export interface ChartDataItem {
  dimensions: {
    data: string[];
  };
  measures: {
    name: string;
    data: number[];
  }[];
}
