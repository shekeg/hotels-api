import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { HotelRoom, HotelRoomDocument } from './hotel-rooms.schema';
import { IHotelRoomService } from './interfaces/hotel-room-service.interface';
import { ISearchRoomsParams } from './interfaces/search-rooms-params.interface';

@Injectable()
export class HotelRoomsService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const createdHotelRoom = new this.hotelRoomModel(data);
    return createdHotelRoom.save().then(({ id }) => {
      return this.hotelRoomModel
        .findById(id, 'title description images isEnabled')
        .populate('hotel', 'title description');
    });
  }

  findById(id: string, isEnabled?: boolean): Promise<HotelRoom> {
    const filter: { _id: string; isEnabled?: boolean } = { _id: id };
    if (isEnabled) {
      filter.isEnabled = isEnabled;
    }
    return this.hotelRoomModel
      .findOne(filter, 'title description images')
      .populate('hotel', 'title description')
      .exec();
  }

  search(params: ISearchRoomsParams): Promise<HotelRoom[]> {
    const filter: FilterQuery<HotelRoomDocument> = {};

    if (params) {
      if (params.title) {
        filter.title = { $regex: new RegExp(params.title) };
      }

      if (params.hotel) {
        filter.hotel = params.hotel;
      }

      if (params.isEnabled) {
        filter.isEnabled = params.isEnabled;
      }
    }

    return this.hotelRoomModel
      .find(filter, 'title images')
      .populate('hotel', 'title')
      .limit(+params.limit)
      .skip(+params.offset)
      .exec();
  }

  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.hotelRoomModel.findByIdAndUpdate(id, data).exec();
  }
}
