import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { Repository } from 'typeorm';
import { SupabaseConfig } from 'src/config/supabase.config';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private reservationsRepository: Repository<Space>,
    private supabaseConfig: SupabaseConfig
  ) {}

  async create(data: any): Promise<Space> {
    
    const reservation = this.reservationsRepository.create({
      garage_id: data.garage_id,
      code: data.code,
      status: data.status,
      hourly_rate: data.hourly_rate,
      display_order: data.display_order,
      is_active: data.is_active || true,
    });

    return this.reservationsRepository.save(reservation);
    
  }

  async findAll(where: any): Promise<Space[]> {
    return this.reservationsRepository.find({where: where});
  }

  async findOne(id: number): Promise<Space> {
    const reservation = await this.reservationsRepository.findOne({where: {id}});
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not foung`);
    }
    return reservation;
  }

  async update(id: number, data: any) {
    const reservation = await this.findOne(id);
    Object.assign(reservation, data);
    return this.reservationsRepository.save(reservation);
  }

  async remove(id: number) {
    const reservation: any = await this.findOne(id);
    await this.reservationsRepository.remove(reservation);
  }
}
