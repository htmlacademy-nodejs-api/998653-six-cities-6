import { prop } from '@typegoose/typegoose';

export class Location {
  @prop({ required: true })
    latitude: number;

  @prop({ required: true })
    longitude: number;
}
