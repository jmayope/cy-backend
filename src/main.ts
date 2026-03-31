import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/response.interceptor';
import { UnauthorizedExceptionFilter } from './common/filters/unauthorizated-exception.filter';
import { BadRequestExceptionFilter } from './common/filters/bad-request-exception.filter';
import { ForbiddenExceptionFilter } from './common/filters/forbidden-exception.filter';
import { InternalServerErrorExceptionFilter } from './common/filters/internal-server-error-exception.filter';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.setGlobalPrefix("api/v1");

  app.enableCors({
    origin: ["http://localhost:4200", "http://192.168.1.18"],
    credentials: true
  });
  app.useGlobalInterceptors(new ResponseInterceptor())

  app.useGlobalFilters(new BadRequestExceptionFilter());
  app.useGlobalFilters(new ForbiddenExceptionFilter());
  app.useGlobalFilters(new InternalServerErrorExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  const port = configService.get<number>("PORT") || 3000;
  console.log(port);
  // const host = "localhost";
  const host = "192.168.1.18";
  await app.listen(port, host);
  // await app.listen(port);

  logger.log(`Application is running on: http://${host}:${port}`);
}
bootstrap();
