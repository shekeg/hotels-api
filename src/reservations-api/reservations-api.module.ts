import { Module } from '@nestjs/common';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { ReservationsApiController } from './reservations-api.controller';
import { ReservationsApiService } from './reservations-api.service';

@Module({
  imports: [ReservationsModule],
  controllers: [ReservationsApiController],
  providers: [ReservationsApiService],
})
export class ReservationsApiModule {}
