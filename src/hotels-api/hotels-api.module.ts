import { Module } from '@nestjs/common';
import { HotelRoomsApiService } from './hotel-rooms-api.service';
import { HotelsApiController } from './hotels-api.controller';
import { HotelsModule } from 'src/hotels/hotels.module';
import { HotelsApiService } from './hotels-api.service';
import { HotelRoomsApiController } from './hotel-rooms-api.controller';

@Module({
  imports: [HotelsModule],
  providers: [HotelsApiService, HotelRoomsApiService],
  controllers: [HotelsApiController, HotelRoomsApiController],
})
export class HotelsApiModule {}
