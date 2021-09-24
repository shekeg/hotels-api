import { Injectable } from '@nestjs/common';
import { UpdateHotelRoomDto } from 'src/hotels/dto/update-hotel-room.dto';
import { HotelRoomsService } from 'src/hotels/hotel-rooms-service.service';
import { Overwrite } from 'src/shared/type-utils';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { ISearchRoomsParams } from './interfaces/search-rooms-params.interface';

@Injectable()
export class HotelRoomsApiService {
  constructor(private readonly hotelRoomsService: HotelRoomsService) {}

  search(user, params: ISearchRoomsParams) {
    if (!user || user.role === 'client') {
      return this.hotelRoomsService.search({
        ...params,
        isEnabled: true,
      });
    }

    return this.hotelRoomsService.search(params);
  }

  findById(user, id: string) {
    return this.hotelRoomsService.findById(id, !user || user.role === 'client');
  }

  create(
    data: Overwrite<CreateHotelRoomDto, { images: Array<Express.Multer.File> }>,
  ) {
    const dataWithStringifiedImages = {
      ...data,
      images: data.images.map((image) => encodeURI(image.path)),
    };
    return this.hotelRoomsService.create(dataWithStringifiedImages);
  }

  update(
    id: string,
    data: Overwrite<UpdateHotelRoomDto, { images: string[] }>,
  ) {
    return this.hotelRoomsService.update(id, data);
  }
}
