import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SupabaseConfig } from 'src/config/supabase.config';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private supabaseConfig: SupabaseConfig
  ) {}

  async create(data: any): Promise<User> {
    console.log(data);
    // const existingUser = await this.usersRepository.findOne(
    //   {
    //     where: { email: data.email }
    //   }
    // );

    // if (existingUser) {
    //   throw new ConflictException("Email already exists");
    // }

    // const supabase = this.supabaseConfig.getClient();
    // const {data: authData, error: authError } = await supabase.auth.admin.createUser({
    //   email: data.email,
    //   password: data.password,
    //   email_confirm: true
    // });

    // if (authError) {
    //   throw new Error(`Error creating user in Supabase Auth: ${authError.message}`);
    // }

    const user = this.usersRepository.create({
      email: data.email,
      password_hash: data.password_hash,
      garage_id: data.garage_id,
      full_name: data.full_name,
      phone_number: data.phone_number,
      role: data.role,
      is_active: true
    });

    return this.usersRepository.save(user);
    
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not foung`);
    }
    return user;
  }

  async update(id: number, data: any) {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user: any = await this.findOne(id);
    const supabase = this.supabaseConfig.getClient();
    await supabase.auth.admin.deleteUser(user.id);

    await this.usersRepository.remove(user);
  }
}
