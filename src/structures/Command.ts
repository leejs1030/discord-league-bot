import { CommandType } from '../typings/Command';

export class Command {
  constructor(commandOptions: CommandType) {
    const runner = commandOptions.run;
    commandOptions.run = async (arg) => {
      try {
        await runner(arg);
      } catch (err) {
        // console.error(err);
        await arg.interaction.followUp(err.message);
      }
    };
    Object.assign(this, commandOptions);
  }
}
