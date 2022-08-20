import { Command } from '../../structures/Command';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { getSummonerByNickname } from '../../libs/riot/get-summoner-by-nickname';
import { getTimeDiff } from '../../libs/utils/get-time-diff';
import { getSoloRankHistory } from '../../libs/riot/get-solo-rank-history';

const positionMapper = {
  UTILITY: '서폿',
  JUNGLE: '정글',
  TOP: '탑',
  MIDDLE: '미드',
  BOTTOM: '원딜',
};

export default new Command({
  name: 'games',
  description: "show user's solo rank history",
  run: async ({ interaction }) => {
    const nickname = interaction.options.data[0].value as string;
    const { puuid } = await getSummonerByNickname(nickname);
    const games = await getSoloRankHistory(puuid);
    const date = new Date();

    const history = games.map((game) => {
      const { gameCreation, participants, teams } = game.info;
      const { championName, teamId, individualPosition } = participants.filter(
        (participant) => participant.puuid === puuid,
      )[0];
      const duration =
        participants.reduce((acc, cur) => {
          return acc >= cur.timePlayed ? acc : cur.timePlayed;
        }, -1) * 1000;
      const win = teams.filter((team) => team.teamId === teamId)[0].win;
      const endDate = new Date(duration + gameCreation);
      const time = getTimeDiff(date, endDate);

      const wl = win ? '승' : '패';
      return `${championName}(${positionMapper[individualPosition]}), ${wl}, ${time}`;
    });

    const string = `${nickname}의 전적\n${history.join('\n')}`;
    return interaction.followUp(string);
  },
  options: [
    {
      type: ApplicationCommandOptionTypes.STRING,
      name: 'nickname',
      description: 'league of legends nickname',
    },
  ],
});
