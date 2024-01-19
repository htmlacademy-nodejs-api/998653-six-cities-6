import { readFileSync } from 'node:fs';
import { CommnadInterface } from './command.interface.js';
import { resolve } from 'node:path';

type TPackageJSONConfig ={
  version: string;
}

function isPackageJSONConfig(value: unknown) : value is TPackageJSONConfig {
  return(
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

class VersionCommand implements CommnadInterface {
  constructor(
    private readonly filePath: string = './package.json',
  ){}


  private readVersion() {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf8');
    const jsonToObject = JSON.parse(jsonContent);

    if(!isPackageJSONConfig(jsonToObject)) {
      throw new Error('Failed to parse json content.');
    }
    return jsonToObject.version;

  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._params: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
export { VersionCommand };
