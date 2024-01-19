import { CommnadInterface } from './command.interface.js';

class ImportCommand implements CommnadInterface {
   public getName(): string {
    return `--import`;
    }

    public execute(...params: string[]): void {

    }
}

export { ImportCommand }
