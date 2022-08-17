import axios from 'axios';
import { headers } from './headers';

const baseUrl = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name';

export const getSummonerIdByNickname = async (nickname: string): Promise<string> => {
  const encodedNickname = encodeURIComponent(nickname);
  return axios
    .get(`${baseUrl}/${encodedNickname}`, { headers })
    .then((res) => res.data.id)
    .catch(() => {
      throw new Error('사용자를 찾을 수 없습니다!');
    });
};
