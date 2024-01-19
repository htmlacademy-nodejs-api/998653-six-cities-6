
import { CommnadInterface } from './commands/command.interface.js';
import { CommandParser } from './commands/command.parser.js';

type CommandCollection = Record<string, CommnadInterface>

class CLIApplication {
  private commands: CommandCollection = {};

  constructor(
    private readonly defaultCommand = '--help',
  ) {}

  public getCommand(commandName: string): CommnadInterface {
    return this.commands[commandName] ?? this.getDefaultCommand;
  }

  public getDefaultCommand(): CommnadInterface | never {
    if(!this.commands[this.defaultCommand]){
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public registerCommands(commandList: CommnadInterface[]): void {
    commandList.forEach((commandItem) => {
      if(Object.hasOwn(commandList, commandItem.getName())) {
        throw new Error(`Command ${commandItem.getName()} is already registered`);
      }
      this.commands[commandItem.getName()] = commandItem;
    });
  }

  public prossesCommand (arg: string[]) {
    const parsedCommand = CommandParser.parse(arg);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArg = parsedCommand[commandName] ?? [];

    command.execute(...commandArg);
  }
}

export { CLIApplication };
