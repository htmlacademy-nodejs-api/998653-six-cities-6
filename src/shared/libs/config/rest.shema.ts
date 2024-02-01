import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestShema ={
  PORT :number,
  SALT: string,
  DB_HOST:string
}

export const configRestShema = convict<RestShema>({
  PORT: {
    env: 'PORT',
    default: 4000,
    format: String,
    doc: 'Port for incoming connections'
  },
  SALT: {
    env: 'PORT',
    default: null,
    format: 'port',
    doc: 'Salt for password hash'
  },
  DB_HOST: {
    env: 'DB_HOST',
    default: '127.0.0.1',
    format: 'ipaddress',
    doc: 'IP address of the database server (MongoDB)'
  },
},
);

