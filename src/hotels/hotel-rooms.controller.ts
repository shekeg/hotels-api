import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { HotelRoomsService } from './hotel-rooms-service.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ParseTrueOrUndefinedPipe } from './pipes/parse-true-or-undefined.pipe';
import { ISearchRoomsParams } from './interfaces/search-rooms-params.interface';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { UpdateHotelRoomBodyPipe } from './pipes/parse-update-hotel-room-body.pipe';
import { Overwrite } from 'src/shared/type-utils';

@Controller('api/admin/hotel-rooms')
export class HotelRoomsController {
  constructor(private readonly hotelRoomsService: HotelRoomsService) {}

  @Put(':id')
  @UseInterceptors(FilesInterceptor('images'))
  update(
    @Param('id') id: string,
    @Body(new UpdateHotelRoomBodyPipe())
    body: Overwrite<UpdateHotelRoomDto, { images: string[] }>,
    @UploadedFiles() newImages: Array<Express.Multer.File>,
  ) {
    const images = [
      ...body.images,
      ...newImages.map((image) => image.originalname),
    ];
    const data = { ...body, images };
    return this.hotelRoomsService.update(id, data);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body() body: Omit<CreateHotelRoomDto, 'images'>,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const data = { ...body, images: images.map((image) => image.originalname) };
    return this.hotelRoomsService.create(data);
  }

  @Get(':id')
  findById(
    @Param('id') id: string,
    @Query('isEnabled', ParseTrueOrUndefinedPipe) isEnabled?: boolean,
  ) {
    return this.hotelRoomsService.findById(id, isEnabled);
  }

  @Get()
  search(@Query() params: ISearchRoomsParams) {
    return this.hotelRoomsService.search(params);
  }
}
