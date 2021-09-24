import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { CreateHotelDto } from './dto/create-hotel.dto';
import { Hotel } from './hotels.schema';
import { HotelsService } from './hotels.service';

@Controller('api/admin/hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.hotelsService.findById(id);
  }
}
