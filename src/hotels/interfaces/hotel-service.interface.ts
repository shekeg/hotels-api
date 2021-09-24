import { UpdateHotelDto } from '../dto/update-hotel.dto';
import { Hotel } from '../hotels.schema';
import { ISearchHotelsParams } from './search-hotels-params.interface';

export interface IHotelService {
  create(data: Partial<Hotel>): Promise<Hotel>;
  findById(id: string): Promise<Hotel>;
  search(params: ISearchHotelsParams): Promise<Hotel[]>;
  update(id: string, data: UpdateHotelDto): Promise<Hotel>;
}
