import { CommnadInterface } from './command.interface.js';

class ImportCommand implements CommnadInterface {
   public getName(): string {
    return `--import`;
    }

    public execute(..._params: string[]): void {

    }
}

export { ImportCommand }
