import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';
import { Repository } from 'typeorm';
import { SupabaseConfig } from 'src/config/supabase.config';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
    private supabaseConfig: SupabaseConfig
  ) {}

  async create(data: any): Promise<Rate> {
    
    let rates: any[] = await this.rateRepository.find({where: {vehicle_type: data.vehicle_type}});

    rates.forEach((r: any) => {
      r.is_active = false;
    });

    await this.rateRepository.save(rates);
    
    const reservation = this.rateRepository.create({
      vehicle_type: data.vehicle_type,
      regular_hour_amount: data.regular_hour_amount,
      holiday_hour_amount: data.holiday_hour_amount,
      is_active: data.is_active || true,
      operator_create_id: data.operator_create_id
    });

    return this.rateRepository.save(reservation);
    
  }

  async findAll(where: any): Promise<Rate[]> {
    return this.rateRepository.find({ where: where});
  }

  async findOne(id: number): Promise<Rate> {
    const reservation = await this.rateRepository.findOne({where: {id}});
    if (!reservation) {
      throw new NotFoundException(`Garage with ID ${id} not foung`);
    }
    return reservation;
  }

  async update(id: number, data: any) {
    const reservation = await this.findOne(id);
    Object.assign(reservation, data);
    return this.rateRepository.save(reservation);
  }

  async remove(id: number) {
    const reservation: any = await this.findOne(id);
    await this.rateRepository.remove(reservation);
  }
}
