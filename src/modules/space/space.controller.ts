import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { SpaceService } from './space.service';

@Controller('space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: any) {
    return this.spaceService.create(body);
  }

  @Post("by")
  findAll(@Body() body: any) {
    return this.spaceService.findAll(body.where || {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.spaceService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceService.remove(+id);
  }
}
