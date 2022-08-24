import riotAxios from '../utils/riot-axios';

const baseUrl = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name';

export const getSummonerByNickname = async (
  nickname: string,
): Promise<{
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  name: string;
}> => {
  const encodedNickname = encodeURIComponent(nickname);
  return riotAxios
    .get(`${baseUrl}/${encodedNickname}`)
    .then((res) => {
      if (!res.data.id) throw new Error();
      return res.data;
    })
    .catch(() => {
      throw new Error('사용자를 찾을 수 없습니다!');
    });
};
