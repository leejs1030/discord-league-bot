import { Command } from '../../../structures/Command';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { getTierMsgByNickname } from './get-tier-msg-by-nickname';

export default new Command({
  name: 'lp',
  description: "show user's lp",
  run: async ({ interaction }) => {
    const nickname = interaction.options.data[0].value as string;

    return interaction.followUp(await getTierMsgByNickname(nickname));
  },
  options: [
    {
      type: ApplicationCommandOptionTypes.STRING,
      name: 'nickname',
      description: 'league of legends nickname',
    },
  ],
});
