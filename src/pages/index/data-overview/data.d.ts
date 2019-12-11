import moment from 'moment';
import { SortName } from '@/pages/data-insight/type';

export type IOverSum = Partial<{
  communicateUserCount: number;
  createdAt: string;
  deviceName: string;
  headImage: string;
  id: number;
  hash: number;
  initiativeNewUserCount: number;
  initiativeNewUserRate: number;
  merchantId: number;
  metricsDay: string;
  momentRecvCommentCount: number;
  momentRecvZanCount: number;
  momentSendCommentCount: number;
  momentSendZanCount: number;
  newUserCount: number;
  nickName: string;
  passiveNewUserCount: number;
  passiveNewUserRate: number;
  robotNo: string;
  timeoutNotReplyCount: number;
  timeoutReplyCount: number;
  totalUserCount: number;
  updatedAt: string;
  validInteractUserCount: number;
  validInteractUserRate: number;
}>;

export type IOverTop = IOverSum[];
export type IDuration = IOverSum[];

export interface ISearchParams {
  dateRange: moment.Moment[];
  robotNo: string | number;
}
