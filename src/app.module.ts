import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { UserModule } from './modules/user/user.module';
import { GarageModule } from './modules/garage/garage.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { SpaceModule } from './modules/space/space.module';
import { TypeModule } from './modules/type/type.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { RateModule } from './modules/rate/rate.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import moment from 'moment';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => databaseConfig(configService)
    }),
    UserModule,
    GarageModule,
    PaymentModule,
    ReservationModule,
    SpaceModule,
    TypeModule,
    VehicleModule,
    RateModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: 'MomentWrapper',
      useValue: moment
    }
  ],
})
export class AppModule {}
