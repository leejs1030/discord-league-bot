import { Command } from '../../structures/Command';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { getSummonerByNickname } from '../../libs/riot/get-summoner-by-nickname';
import { getSoloRankMatchIds } from '../../libs/riot/get-solo-rank-match-ids';
import { getGamesByMatchIds } from '../../libs/riot/get-games-by-match-ids';

export default new Command({
  name: 'games',
  description: "show user's solo rank history",
  run: async ({ interaction }) => {
    const nickname = interaction.options.data[0].value as string;
    const { puuid } = await getSummonerByNickname(nickname);
    const arr = await getSoloRankMatchIds(puuid);
    const games = await getGamesByMatchIds(arr);
    return interaction.followUp(JSON.stringify(games));
  },
  options: [
    {
      type: ApplicationCommandOptionTypes.STRING,
      name: 'nickname',
      description: 'league of legends nickname',
    },
  ],
});
