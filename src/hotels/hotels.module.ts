import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { Hotel, HotelSchema } from './hotels.schema';
import { HotelRoom, HotelRoomSchema } from './hotel-rooms.schema';
import { HotelRoomsController } from './hotel-rooms.controller';
import { HotelRoomsService } from './hotel-rooms-service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  controllers: [HotelsController, HotelRoomsController],
  providers: [HotelsService, HotelRoomsService],
  exports: [HotelsService, HotelRoomsService],
})
export class HotelsModule {}
