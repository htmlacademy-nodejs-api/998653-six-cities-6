import { CommnadInterface } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { CreateOffer, getErrorMessage } from '../../shared/helpers/index.js';

class ImportCommand implements CommnadInterface {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = CreateOffer(line);
    console.info(offer);
  }

  private onCompliteEnd(count: number) {
    console.info(`${count} rows imported.`);

  }

  public async execute(..._params: string[]): Promise<void> {
    const [ filename ] = _params;
    const fileReader = new TSVFileReader(filename);

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompliteEnd);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}

export { ImportCommand };
