import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { HotelRoomsApiService } from './hotel-rooms-api.service';
import { ISearchRoomsParams } from './interfaces/search-rooms-params.interface';
import { editFileName } from './utils/edit-file-name';

@Controller()
export class HotelRoomsApiController {
  constructor(private readonly hotelRoomsApiService: HotelRoomsApiService) {}

  @Get('/api/common/hotel-rooms')
  search(@Request() req, @Query() params: ISearchRoomsParams) {
    return this.hotelRoomsApiService.search(req.user, params);
  }

  @Get('/api/common/hotel-rooms/:id')
  findById(@Request() req, @Param('id') id: string) {
    return this.hotelRoomsApiService.findById(req.user, id);
  }

  @Post('/api/admin/hotel-rooms')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './files/room-images',
        filename: editFileName,
      }),
    }),
  )
  create(
    @Body() body: Omit<CreateHotelRoomDto, 'images'>,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    return this.hotelRoomsApiService.create({ ...body, images });
  }

  @Put('/api/admin/hotel-rooms/:id')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './files/room-images',
        filename: editFileName,
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() body: UpdateHotelRoomDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    let bodyImages = [];

    if (body.images) {
      if (typeof body.images === 'string') {
        bodyImages.push(body.images);
      } else if (Array.isArray(body.images)) {
        bodyImages = body.images;
      }
    }

    const multerImagePaths = images.map((image) => encodeURI(image.path));

    const mergedImagePaths = [...bodyImages, ...multerImagePaths];

    return this.hotelRoomsApiService.update(id, {
      ...body,
      images: mergedImagePaths,
    });
  }
}
