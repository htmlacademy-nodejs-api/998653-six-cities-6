//--generate <n> <filepath> <url>
import got from 'got';
import { CommnadInterface } from './command.interface.js';
import { TMocksServerData } from '../../shared/types/index.js';
import { TSVOfferGenerator } from '../../shared/offer-generator/index.js';
import { appendFile } from 'node:fs/promises';

class GenerateCommand implements CommnadInterface {
  private readonly name: string = '--generate';
  private initalData: TMocksServerData;


  private async load(url: string) {
    try {
      this.initalData = got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }

  }

  public async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initalData);

    for(let i = 0; i < offerCount; i++) {
      await appendFile(
        filepath,
        `${tsvOfferGenerator.generate()}\n`,
        {encoding: 'utf-8'}
      );
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
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}


export { GenerateCommand };
