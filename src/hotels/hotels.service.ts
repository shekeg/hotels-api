import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel, HotelDocument } from './hotels.schema';
import { IHotelService } from './interfaces/hotel-service.interface';
import { ISearchHotelsParams } from './interfaces/search-hotels-params.interface';

@Injectable()
export class HotelsService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const createdHotel = new this.hotelModel(createHotelDto);
    return createdHotel.save().then(({ id }) => {
      return this.hotelModel.findById(id, 'title description');
    });
  }

  findById(id: string): Promise<Hotel> {
    return this.hotelModel.findById(id).exec();
  }

  search(params: ISearchHotelsParams): Promise<Hotel[]> {
    return this.hotelModel
      .find({}, 'title description')
      .limit(+params.limit)
      .skip(+params.offset)
      .exec();
  }

  update(id: string, data: UpdateHotelDto): Promise<Hotel> {
    return this.hotelModel
      .findByIdAndUpdate(id, data, { new: true })
      .select({ title: 1, description: 1 })
      .exec();
  }
}
