import riotAxios from '../utils/riot-axios';

const baseUrl = 'https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid';
export const getRankMatchIds = async (puuid: string, start = 0): Promise<any> => {
  return riotAxios
    .get(`${baseUrl}/${puuid}/ids?start=${start}&count=10&type=ranked`)
    .then((res) => res.data);
};
