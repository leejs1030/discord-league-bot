import axios from 'axios';
import { headers } from './headers';

const baseUrl = 'https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid';
export const getRankMatchIds = async (puuid: string, start = 0): Promise<any> => {
  return axios
    .get(`${baseUrl}/${puuid}/ids?start=${start}&count=10&type=ranked`, { headers })
    .then((res) => res.data);
};
