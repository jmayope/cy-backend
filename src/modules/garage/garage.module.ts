import { Module } from '@nestjs/common';
import { GarageService } from './garage.service';
import { GarageController } from './garage.controller';
import { Garage } from './entities/garage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Garage])],
  controllers: [GarageController],
  providers: [GarageService],
  exports: [GarageService]
})
export class GarageModule {}
