import axios from 'axios';
import { headers } from './headers';

const baseUrl = 'https://asia.api.riotgames.com/lol/match/v5/matches';
export const getGamesByMatchIds = async (arr: string[]) => {
  console.log('this?');
  return Promise.all(
    arr.map((matchId) => axios.get(`${baseUrl}/${matchId}`, { headers }).then((res) => res.data)),
  );
};
