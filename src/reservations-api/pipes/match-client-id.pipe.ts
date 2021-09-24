import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ReservationsApiService } from '../reservations-api.service';

@Injectable()
export class MatchClientId
  implements PipeTransform<{ user: string; reservationId: string }>
{
  constructor(private readonly reservationApiService: ReservationsApiService) {}

  transform(
    value: { user: string; reservationId: string },
    metadata: ArgumentMetadata,
  ) {
    return this.reservationApiService.matchClientId(
      value.user,
      value.reservationId,
    );
  }
}
