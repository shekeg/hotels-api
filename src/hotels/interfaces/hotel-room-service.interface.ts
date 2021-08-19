import { HotelRoom } from '../hotel-rooms.schema';
import { ISearchRoomsParams } from './search-rooms-params.interface';

export interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: string, isEnabled?: true): Promise<HotelRoom>;
  search(params: ISearchRoomsParams): Promise<HotelRoom[]>;
  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
