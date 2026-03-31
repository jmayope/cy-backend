import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { GarageService } from './garage.service';

@Controller('garage')
export class GarageController {
  constructor(private readonly garageService: GarageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: any) {
    return this.garageService.create(body);
  }

  @Get()
  findAll() {
    return this.garageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.garageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.garageService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.garageService.remove(+id);
  }
}
