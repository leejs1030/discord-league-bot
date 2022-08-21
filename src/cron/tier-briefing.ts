import { getTierMsgByNickname } from '../commands/league-of-legends/tier-point/service/get-tier-msg-by-nickname';

const users = typeof process.env.USERS === 'string' ? process.env.USERS.split(',') : [];

export const tierBriefing = async () => {
  const arr = await Promise.all(users.map(getTierMsgByNickname));
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const dateInfo = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 티어 공유를 시작합니다.\n\n\n`;
  return `${dateInfo}${arr.join('\n')}`;
};
