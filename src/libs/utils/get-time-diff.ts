import moment from 'moment/moment';

export const getTimeDiff = (d1: Date, d2: Date) => {
  const min = moment(d1).diff(moment(d2), 'minute');
  const hour = moment(d1).diff(moment(d2), 'hour');
  const day = moment(d1).diff(moment(d2), 'day');

  if (min < 90) return `${min}분 전`;
  else if (hour < 36) return `${hour}시간 전`;
  else return `${day}일 전`;
};
