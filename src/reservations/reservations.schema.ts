import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HotelRoom } from 'src/hotels/hotel-rooms.schema';
import { Hotel } from 'src/hotels/hotels.schema';
import { User } from 'src/users/users.schema';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: User.name,
    required: true,
  })
  user: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Hotel.name,
    required: true,
  })
  hotel: Hotel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: HotelRoom.name,
    required: true,
  })
  hotelRoom: HotelRoom;

  @Prop({ type: Date, required: true })
  dateStart: Date;

  @Prop({ type: Date, required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
