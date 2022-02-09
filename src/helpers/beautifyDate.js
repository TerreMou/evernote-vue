import dayjs from 'dayjs';

export function beautifyDate(dateStr) {
  const date = dayjs(dateStr);
  const dateSpace = dayjs().diff(date);
  let dateDisplay = '';

  switch (true) {
    case dateSpace < 1000 * 60:
      dateDisplay = '刚刚';
      break;
    case dateSpace < 1000 * 3600:
      dateDisplay = dayjs().diff(date, 'minute') + ' 分钟前';
      break;
    case dateSpace < 1000 * 3600 * 24:
      dateDisplay = dayjs().diff(date, 'hour') + ' 小时前';
      break;
    case dateSpace <= 1000 * 3600 * 24 * 30:
      dateDisplay = dayjs().diff(date, 'day') + ' 天前';
      break;
    default:
      dateDisplay = date.format('YYYY-MM-DD');
  }
  return dateDisplay;
}
