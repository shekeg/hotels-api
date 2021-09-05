import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { IReservationSearchOptions } from './interfaces/reservation-search-options.interface';
import { IReservationService } from './interfaces/reservation-service.interface';
import { Reservation, ReservationDocument } from './reservations.schema';

@Injectable()
export class ReservationsService implements IReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  addReservation(data: CreateReservationDto): Promise<Reservation> {
    const createdReservation = new this.reservationModel(data);
    return createdReservation.save().then(({ id }) => {
      return this.reservationModel
        .findById(id, 'dateStart dateEnd')
        .populate('hotelRoom', 'title description images')
        .populate('hotel', 'title description');
    });
  }

  removeReservation(id: string): Promise<void> {
    return this.reservationModel
      .findByIdAndDelete(id)
      .exec()
      .then(() => null);
  }

  getReservations(filter: IReservationSearchOptions): Promise<Reservation[]> {
    const queryFilter: FilterQuery<Reservation> = {};

    if (filter) {
      if (filter.dateStart) {
        queryFilter.dateStart = new Date(filter.dateStart);
      }

      if (filter.dateEnd) {
        queryFilter.dateEnd = new Date(filter.dateEnd);
      }

      if (filter.user) {
        queryFilter.user = filter.user;
      }
    }

    return this.reservationModel
      .find(queryFilter, 'dateStart dateEnd')
      .populate('hotelRoom', 'title description images')
      .populate('hotel', 'title description')
      .exec();
  }
}
