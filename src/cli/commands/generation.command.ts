//--generate <n> <filepath> <url>
import { CommnadInterface } from './command.interface.js';

class GenerateCommand implements CommnadInterface {
  constructor(){}

  getName(): string {
    return '--generate';
  }

  execute(..._params: string[]): void {

  }
}

export { GenerateCommand };
