import { Command } from '../../structures/Command';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { getSummonerIdByNickname } from '../../libs/riot/get-summoner-id-by-nickname';
import { getSoloRankTier } from '../../libs/riot/get-solo-rank-tier';

export default new Command({
  name: 'lp',
  description: "show user's lp",
  run: async ({ interaction }) => {
    const nickname = interaction.options.data[0].value as string;
    const summonerId = await getSummonerIdByNickname(nickname);
    if (!summonerId) throw new Error('사용자를 찾을 수 없습니다!');
    const { tier, rank, leaguePoints } = await getSoloRankTier(summonerId);

    return interaction.followUp(`${tier} ${rank}, ${leaguePoints}lp`);
  },
  options: [
    {
      type: ApplicationCommandOptionTypes.STRING,
      name: 'nickname',
      description: 'league of legends nickname',
    },
  ],
});
