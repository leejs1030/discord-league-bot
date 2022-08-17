import axios from 'axios';
import { headers } from './headers';

const baseUrl = 'https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid';
export const getSoloRankMatchIds = async (puuid: string): Promise<any> => {
  return axios.get(`${baseUrl}/${puuid}/ids?start=0&count=10`, { headers }).then((res) => res.data);
};
