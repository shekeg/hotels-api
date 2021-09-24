import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationDto } from 'src/reservations/dto/create-reservation.dto';
import { IReservationSearchOptions } from 'src/reservations/interfaces/reservation-search-options.interface';
import { Reservation } from 'src/reservations/reservations.schema';
import { ReservationsService } from 'src/reservations/reservations.service';

@Injectable()
export class ReservationsApiService {
  constructor(private readonly reservationsService: ReservationsService) {}

  addReservation(data: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.addReservation(data);
  }

  removeReservation(user, id: string): Promise<void> {
    return this.matchClientId(user, id).then((isMatch) => {
      if (isMatch) {
        return this.reservationsService.removeReservation(id);
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    });
  }

  getReservations(filter: IReservationSearchOptions): Promise<Reservation[]> {
    return this.reservationsService.getReservations(filter);
  }

  matchClientId(user, id) {
    return this.reservationsService.matchClientId(user, id);
  }

  getReservationsByUserId(userId: string) {
    return this.reservationsService.getReservations({ user: userId });
  }

  removeReservationsByUserId(userId: string, id: string) {
    return this.matchClientId(userId, id).then((isMatch) => {
      if (isMatch) {
        return this.reservationsService.removeReservation(id);
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    });
  }
}
