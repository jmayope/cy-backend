import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: "postgres",
  url: configService.get<string>("SUPABASE_DB_URL"),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: configService.get<string>("NODE_ENV") === "development",
  ssl: {
    rejectUnauthorized: false
  }
})