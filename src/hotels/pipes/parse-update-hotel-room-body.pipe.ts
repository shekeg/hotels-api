import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UpdateHotelRoomBodyPipe implements PipeTransform {
  transform(value: any) {
    try {
      return {
        ...value,
        images: value.images ? JSON.parse(value.images) : [],
      };
    } catch {
      throw new BadRequestException('Validation failed');
    }
  }
}
