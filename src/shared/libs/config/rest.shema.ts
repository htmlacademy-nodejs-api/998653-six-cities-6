import convic from 'convict';

export type RestShema ={
  PORT :number
}

export const configRestShema = convic<RestShema>({
  PORT: {
    env: 'PORT',
    default: 4000,
    format: 'port',
    doc: 'Port for incoming connections'
  }
});

