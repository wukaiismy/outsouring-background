//处理时间格式问题
export function timeType(code) {
  if (!code) return '-';
  var dataTime;
  dataTime = code
    .split('T')
    .join(' ')
    .substring(0, 19);

  return dataTime;
}
