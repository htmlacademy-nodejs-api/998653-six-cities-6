import convict from 'convict';

export type RestShema ={
  PORT :number
}

export const configRestShema = convict<RestShema>({
  PORT: {
    env: 'PORT',
    default: 4000,
    format: 'port',
    doc: 'Port for incoming connections'
  }
});

