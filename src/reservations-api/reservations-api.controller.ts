import {
  Body,
  Controller,
  Delete,
  Get,
  Request,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientGuard } from 'src/common/guards/client.guard';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { CreateReservationDto } from 'src/reservations/dto/create-reservation.dto';
import { IReservationSearchOptions } from 'src/reservations/interfaces/reservation-search-options.interface';
import { ReservationsApiService } from './reservations-api.service';
import { ManagerGuard } from 'src/common/guards/manager.guard';

@Controller()
export class ReservationsApiController {
  constructor(
    private readonly reservationsApiService: ReservationsApiService,
  ) {}

  @UseGuards(AuthenticatedGuard, ClientGuard)
  @Post('api/client/reservations')
  addReservation(
    @Request() req,
    @Body() createReservationDto: Exclude<CreateReservationDto, 'user'>,
  ) {
    return this.reservationsApiService.addReservation({
      ...createReservationDto,
      user: req.user._doc._id,
    });
  }

  @UseGuards(AuthenticatedGuard, ClientGuard)
  @Get('api/client/reservations')
  getReservations(
    @Request() req,
    @Query() filter: Exclude<IReservationSearchOptions, 'user'>,
  ) {
    return this.reservationsApiService.getReservations({
      ...filter,
      user: req.user._doc._id,
    });
  }

  @UseGuards(AuthenticatedGuard, ClientGuard)
  @Delete('api/client/reservations/:id')
  removeReservation(@Request() req, @Param('id') id: string) {
    return this.reservationsApiService.removeReservation(req.user, id);
  }

  @UseGuards(AuthenticatedGuard, ManagerGuard)
  @Get('api/manager/reservations/:userId')
  getReservationsByUserId(@Param('userId') userId: string) {
    return this.reservationsApiService.getReservationsByUserId(userId);
  }

  @UseGuards(AuthenticatedGuard, ManagerGuard)
  @Delete('api/manager/reservations/:userId/:id')
  removeReservationsByUserId(
    @Param('userId') userId: string,
    @Param('id') id: string,
  ) {
    return this.reservationsApiService.removeReservationsByUserId(userId, id);
  }
}
