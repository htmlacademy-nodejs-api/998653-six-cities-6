//--generate <n> <filepath> <url>
import got from 'got';
import { CommnadInterface } from './command.interface.js';
import { TMocksServerData } from '../../shared/types/index.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';

class GenerateCommand implements CommnadInterface {
  private readonly name: string = '--generate';
  private initalData: TMocksServerData;


  private async load(url: string) {
    try {
      this.initalData = await got.get(url).json();

    } catch {
      throw new Error(`Can't load data from ${url}`);
    }

  }

  public async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initalData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for(let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return this.name;
  }

  public async execute(..._params: string[]): Promise<void> {
    const [count, filepath, url] = _params;

    const offerCount = parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error(getErrorMessage(error));

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}


export { GenerateCommand };
