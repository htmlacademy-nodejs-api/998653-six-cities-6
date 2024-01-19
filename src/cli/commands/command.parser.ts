type TCommandParser = Record<string, string[]>;

class CommandParser {
  static parse(cliArgs: string[]): TCommandParser{
    const parsedCommands: TCommandParser = {};
    let currentCommand = '';

    for(const arg of cliArgs) {
      if(arg.startsWith('--')) {
        parsedCommands[arg] = [];
        currentCommand = arg;
      } else if (currentCommand && arg) {
        parsedCommands[currentCommand].push(arg);
      }
    }
    return parsedCommands;
  }
}

export { CommandParser };
