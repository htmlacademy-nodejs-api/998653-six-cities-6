import EventEmitter from 'node:events';
import { FileReader } from './file-reader.interface.js';


class TSVFileReader extends EventEmitter implements FileReader {
  constructor(
    private readonly filename: string
  ) {
    super();
  }

  public read() {

  };
}

export { TSVFileReader};
