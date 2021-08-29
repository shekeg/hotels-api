export class CreateReservationDto {
  user: string;
  hotel: string; // TODO: убрать, так как определим по room
  hotelRoom: string;
  dateStart: Date;
  dateEnd: Date;
}
