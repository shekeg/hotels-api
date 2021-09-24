export class CreateHotelRoomDto {
  public title: string;
  public description?: string;
  public hotelId: string;
  public isEnabled: boolean;
  public images?: File[];
}
