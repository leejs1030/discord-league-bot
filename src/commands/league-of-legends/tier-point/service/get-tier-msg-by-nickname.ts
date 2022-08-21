import { getSummonerByNickname } from '../../../../libs/riot/get-summoner-by-nickname';
import { getSoloRankTier } from '../../../../libs/riot/get-solo-rank-tier';

export const getTierMsgByNickname = async (nickname: string) => {
  const { id: summonerId } = await getSummonerByNickname(nickname);
  const { tier, rank, leaguePoints } = await getSoloRankTier(summonerId);
  return `${nickname}의 티어\t\t\t${tier} ${rank}, ${leaguePoints}lp`;
};
