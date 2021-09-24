import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelsApiService } from './hotels-api.service';
import { ISearchHotelsParams } from './interfaces/search-hotels-params.interface';

@Controller()
export class HotelsApiController {
  constructor(private readonly hotelsApiService: HotelsApiService) {}
  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Post('/api/admin/hotels')
  createHotel(@Body() data: CreateHotelDto) {
    return this.hotelsApiService.create(data);
  }

  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Get('/api/admin/hotels')
  searchHotel(@Query() params: ISearchHotelsParams) {
    return this.hotelsApiService.search(params);
  }

  @UseGuards(AuthenticatedGuard, AdminGuard)
  @Put('/api/admin/hotels/:id')
  updateHotel(@Param('id') id: string, @Body() params: UpdateHotelDto) {
    return this.hotelsApiService.update(id, params);
  }
}
