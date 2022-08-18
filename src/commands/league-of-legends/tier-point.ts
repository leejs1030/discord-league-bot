import { Command } from '../../structures/Command';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { getSummonerByNickname } from '../../libs/riot/get-summoner-by-nickname';
import { getSoloRankTier } from '../../libs/riot/get-solo-rank-tier';

export default new Command({
  name: 'lp',
  description: "show user's lp",
  run: async ({ interaction }) => {
    const nickname = interaction.options.data[0].value as string;
    const { id: summonerId } = await getSummonerByNickname(nickname);
    const { tier, rank, leaguePoints } = await getSoloRankTier(summonerId);

    return interaction.followUp(`${nickname}의 티어\n${tier} ${rank}, ${leaguePoints}lp`);
  },
  options: [
    {
      type: ApplicationCommandOptionTypes.STRING,
      name: 'nickname',
      description: 'league of legends nickname',
    },
  ],
});
