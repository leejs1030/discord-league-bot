import { Command } from '../../structures/Command';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { getSummonerByNickname } from '../../libs/riot/get-summoner-by-nickname';
import { getSoloRankHistory } from '../../libs/riot/get-solo-rank-history';
import { getShortInfoByGame } from '../../libs/riot/get-short-info-by-game';

export default new Command({
  name: 'games',
  description: "show user's solo rank history",
  run: async ({ interaction }) => {
    const nickname = interaction.options.data[0].value as string;
    const { puuid } = await getSummonerByNickname(nickname);
    const games = await getSoloRankHistory(puuid);
    const date = new Date();

    const history = await Promise.all(
      games.map((game) => getShortInfoByGame({ puuid, game, date })),
    );

    const string = `${nickname}의 솔로 랭크 전적\n${history.join('\n')}`;
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
