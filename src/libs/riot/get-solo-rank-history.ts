import { getRankMatchIds } from './get-rank-match-ids';
import { getGamesByMatchIds } from './get-games-by-match-ids';

export const getSoloRankHistory = async (puuid) => {
  let soloRankGames = [];
  for (let i = 0; i < 5 && soloRankGames.length < 10; i++) {
    console.log('hi, ', i);
    const arr = await getRankMatchIds(puuid, i * 10);
    console.log(arr);
    const games = await getGamesByMatchIds(arr).then((data) =>
      data.filter((val) => val.info.queueId === 420),
    );
    soloRankGames = [...soloRankGames, ...games];
    if (arr.length < 10) break;
  }
  return soloRankGames;
};
