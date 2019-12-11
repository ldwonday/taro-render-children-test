import moment from 'moment';
import { ColumnType } from './constants';
import {CSSProperties} from "react";

export interface DevicesListParams extends TableListPagination {
  status: number;
}

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
  robotNo: PopSelectListItem['id'];
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

export interface TableListColumn<T> {
  title: string;
  dataIndex: string;
  span?: number;
  style?: CSSProperties;
  type?: ColumnType;
}

type SortName = 'asc' | 'desc';
