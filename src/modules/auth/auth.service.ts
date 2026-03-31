import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SupabaseConfig } from 'src/config/supabase.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private supabaseConfig: SupabaseConfig,
    private jwtService: JwtService
  ) {}

  async login(credentials: any) {
    console.log(credentials);
    let password_hash = credentials.password_hash || credentials.password;
    const user: any = await this.usersRepository.findOne({where: {email: credentials.email, password_hash: password_hash}});
    if (!user) {
      return null;
    }
    let userData: any = JSON.parse(JSON.stringify(user));
    let payload = {sub: user.id, email: user.email, password_hash: user.password_hash};
    userData.token = await this.jwtService.signAsync(payload);
    
    return userData;
  }

  
}
