import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from 'discord.js';
import { CommandType } from '../typings/Command';
import glob from 'glob';
import { promisify } from 'util';
import { RegisterCommandsOptions } from '../typings/client';
import { Event } from './Event';
import { tierBriefing } from '../cron/tier-briefing';
import axios from 'axios';
import { championNameMapeer } from '../libs/riot/get-short-info-by-game';

const Cron = require('node-cron');
const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();

  constructor() {
    super({ intents: 32767 });
  }

  start() {
    this.registerModules();
    this.login(process.env.botToken);
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`Registering commands to ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      console.log('Registering global commands');
    }
  }

  async registerModules() {
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(`${__dirname}/../commands/**/controller/*{.ts,.js}`);
    for await (const filePath of commandFiles) {
      const command: CommandType = await this.importFile(filePath);
      if (!command || !command.name) continue;
      console.log(command);

      this.commands.set(command.name, command);
      slashCommands.push(command);
    }

    this.on('ready', () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.guildId,
      });

      Cron.schedule('0 0 15 * * *', async () => {
        const channel = this.channels.cache.get(process.env.CHANNEL) as any;
        const msg = await tierBriefing();
        channel.send(msg);
      });

      Cron.schedule('0 */5 * * * *', async () => {
        const channel = this.channels.cache.get(process.env.CHANNEL) as any;
        const userIdArr = process.env.DISCORD_USERS_ID.split(',');
        const userNameArr = process.env.DISCORD_USERS_NAME.split(',');
        const msg = userIdArr.map((id, idx) =>
          channel.send(`<@${id}> ${userNameArr[idx]}\n이럴 때가 아님\n알파벳 모으셈`),
        );
        Promise.all(msg);
      });
    });

    // Event
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    for await (const filePath of eventFiles) {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    }

    const tmp = await axios
      .get('http://ddragon.leagueoflegends.com/cdn/12.15.1/data/ko_KR/champion.json')
      .then((res) => {
        const { data } = res.data;
        const keys = Object.keys(data);
        return keys.reduce((acc, cur) => {
          acc = { ...acc, [cur]: data[cur].name };
          return acc;
        }, {});
      });
    Object.assign(championNameMapeer, tmp);
  }
}
