export const EAll = '_all';
export const allDevice: PopSelectListItem = { id: EAll, name: '所有设备' };
export const EAllProvince = '_all';
export const allProvince: PopSelectListItem = { id: EAll, name: '全国' };
export enum EDateSelect {
  YESTERDAY,
  SEVEN_DAYS,
  ONE_MONTH,
  THREE_MONTH,
}
export const DateSelectText = {
  [EDateSelect.YESTERDAY]: '昨天',
  [EDateSelect.SEVEN_DAYS]: '近7天',
  [EDateSelect.ONE_MONTH]: '近1个月',
  [EDateSelect.THREE_MONTH]: '近3个月',
};

export const enum MomentType {
  IMAGE_TEXT = 1,
  TEXT = 2,
}

export const enum ColumnType {
  IMAGE,
  TEXT,
  MOMENT_ITEM,
  PERCENT,
}

export const sortByList = [
  {
    id: 'desc',
    name: '从高到低',
  },
  {
    id: 'asc',
    name: '从低到高',
  },
];
