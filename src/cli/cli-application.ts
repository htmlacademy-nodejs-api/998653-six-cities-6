// import { VersionCommand } from './commands/version.command.js';
// import { HelpCommand  } from './commands/help.command.js';
import { CommnadInterface } from  './commands/command.interface.js';

type CommandCollection = Record<string, CommnadInterface>

class CLIApplication {
  private commads: CommandCollection =  {}

  constructor(

  ) {}

 public registerCommand(commandList: CommnadInterface[]): void {
  commandList.forEach((commandItem) => {
    if(Object.hasOwn(commandList, commandItem.getName())) {
      throw new Error(`Command ${commandItem.getName()} is already registered`);
    }
    this.commads[commandItem.getName()] = commandItem;
  })
 }

  public parsedInput () {

  }
}

export { CLIApplication }
