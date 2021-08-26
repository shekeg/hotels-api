import { Hotel } from '../hotels.schema';

export interface IHotelService {
  create(data: Partial<Hotel>): Promise<Hotel>;
  findById(id: string): Promise<Hotel>;
  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]>;
  update(id: string, data: Partial<Hotel>): Promise<Hotel>;
}
