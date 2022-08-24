import riotAxios from '../utils/riot-axios';

const baseUrl = 'https://asia.api.riotgames.com/lol/match/v5/matches';
export const getGamesByMatchIds = async (arr: string[]) => {
  return Promise.all(
    arr.map((matchId) => riotAxios.get(`${baseUrl}/${matchId}`).then((res) => res.data)),
  );
};
