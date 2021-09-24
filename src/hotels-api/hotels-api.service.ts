import { Injectable } from '@nestjs/common';
import { HotelsService } from 'src/hotels/hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ISearchHotelsParams } from './interfaces/search-hotels-params.interface';

@Injectable()
export class HotelsApiService {
  constructor(private readonly hotelsService: HotelsService) {}

  create(data: CreateHotelDto) {
    return this.hotelsService.create(data);
  }

  search(params: ISearchHotelsParams) {
    return this.hotelsService.search(params);
  }

  update(id: string, params: UpdateHotelDto) {
    return this.hotelsService.update(id, params);
  }
}
