import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Hotel } from './hotels.schema';

export type HotelRoomDocument = HotelRoom & Document;

@Schema({ timestamps: true })
export class HotelRoom {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Hotel.name })
  hotel: Hotel;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop([String])
  images: string[];

  @Prop({ default: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
