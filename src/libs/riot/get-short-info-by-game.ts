import { getTimeDiff } from '../utils/get-time-diff';

const positionMapper = {
  UTILITY: '서폿',
  JUNGLE: '정글',
  TOP: '탑',
  MIDDLE: '미드',
  BOTTOM: '원딜',
};

export const championNameMapeer = {};

export const getShortInfoByGame = async ({
  puuid,
  game,
  date,
}: {
  puuid: string;
  game: any;
  date: Date;
}) => {
  const { gameCreation, participants, teams } = game.info;
  const { championName, teamId, individualPosition, kills, assists, deaths } = participants.filter(
    (participant) => participant.puuid === puuid,
  )[0];
  const duration =
    participants.reduce((acc, cur) => {
      return acc >= cur.timePlayed ? acc : cur.timePlayed;
    }, -1) * 1000;
  const win = teams.filter((team) => team.teamId === teamId)[0].win;
  const endDate = new Date(duration + gameCreation);
  const time = getTimeDiff(date, endDate);

  const wl = win ? '승' : '패';
  return `${wl}\t${time}\t${kills}/${deaths}/${assists}\t${championNameMapeer[championName]}(${positionMapper[individualPosition]})`;
};
