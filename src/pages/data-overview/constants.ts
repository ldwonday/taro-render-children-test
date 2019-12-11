export const enum DataView {
  totalUserCount = 'totalUserCount',
  newUserCount = 'newUserCount',
  passiveNewUserCount = 'passiveNewUserCount',
  initiativeNewUserCount = 'initiativeNewUserCount',
  initiativeNewUserRate = 'initiativeNewUserRate',
}

export const DataViewName = {
  [DataView.totalUserCount]: '总用户数',
  [DataView.newUserCount]: '新增用户数',
  [DataView.passiveNewUserCount]: '被动加用户数',
  [DataView.initiativeNewUserCount]: '主动加用户数',
  [DataView.initiativeNewUserRate]: '主动加用户通过率',
};
