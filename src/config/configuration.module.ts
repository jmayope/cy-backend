import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SupabaseConfig } from "./supabase.config";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ],
  providers: [SupabaseConfig, ConfigService],
  exports: [SupabaseConfig, ConfigService]
})

export class ConfigurationModule {}