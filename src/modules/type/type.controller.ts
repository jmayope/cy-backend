import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: any) {
    return this.typeService.create(body);
  }

  @Post("by")
  findAll(@Body() body: any) {
    return this.typeService.findAll(body.where || {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.typeService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove(+id);
  }
}
