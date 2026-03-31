import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: any) {
    return this.rateService.create(body);
  }

  @Post("by")
  findAll(@Body() body: any) {
    return this.rateService.findAll(body.where || {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.rateService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rateService.remove(+id);
  }
}
