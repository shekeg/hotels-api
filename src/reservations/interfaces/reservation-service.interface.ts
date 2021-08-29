import { CreateReservationDto } from '../dto/create-reservation.dto';
import { Reservation } from '../reservations.schema';
import { IReservationSearchOptions } from './reservation-search-options.interface';

export interface IReservationService {
  addReservation(data: CreateReservationDto): Promise<Reservation>;
  removeReservation(id: string): Promise<void>;
  getReservations(
    filter: IReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}
