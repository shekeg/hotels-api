import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { IReservationSearchOptions } from './interfaces/reservation-search-options.interface';
import { Query } from '@nestjs/common';

@Controller('api/admin/reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  addReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.addReservation(createReservationDto);
  }

  @Get()
  getReservations(@Query() filter: IReservationSearchOptions) {
    return this.reservationsService.getReservations(filter);
  }

  @Delete(':id')
  removeReservation(@Param('id') id: string) {
    return this.reservationsService.removeReservation(id);
  }
}
