import axios from 'axios';
import { headers } from './headers';

const baseUrl = 'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner';
export const getSoloRankTier = async (
  summonerId: string,
): Promise<{ tier: string; rank: string; leaguePoints: number }> => {
  const val = await axios.get(`${baseUrl}/${summonerId}`, { headers }).then((res) => res.data);
  for (const i of val) {
    if (i.queueType === 'RANKED_SOLO_5x5') {
      return i;
    }
  }
  throw new Error('랭크 정보를 찾을 수 없습니다!');
};
