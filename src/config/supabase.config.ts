import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseConfig {
  private supabaseClient: SupabaseClient;

  constructor(
    private configService: ConfigService
  ) {
    this.supabaseClient = createClient(
      this.configService.get<string>("SUPABASE_URL") || '',
      this.configService.get<string>("SUPABASE_SERVICE_ROLE_KEY") || '', {
        auth: {
          autoRefreshToken: true,
          persistSession: false
        },
        db: {
          schema: 'public'
        }
      }
    );
  }

  getClient(): SupabaseClient {
    return this.supabaseClient;
  }
}