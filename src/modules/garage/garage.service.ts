import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Garage } from './entities/garage.entity';
import { Repository } from 'typeorm';
import { SupabaseConfig } from 'src/config/supabase.config';

@Injectable()
export class GarageService {
  constructor(
    @InjectRepository(Garage)
    private garagesRepository: Repository<Garage>,
    private supabaseConfig: SupabaseConfig
  ) {}

  async create(data: any) {
    
    const garage = this.garagesRepository.create({
      business_name: data.business_name,
      tax_id: data.tax_id,
      address: data.address,
      primary_phone: data.primary_phone,
      contact_email: data.contact_email,
      logo_url: data.logo_url,
      settings: data.settings,
      is_active: data.is_active || true
    });

    return this.garagesRepository.save(garage);
  }

  async findAll() {
    return this.garagesRepository.find();
  }

  async findOne(id: number) {
    const garage = await this.garagesRepository.findOne({where: {id}});
    if (!garage) {
      throw new NotFoundException(`Garage with ID ${id} not foung`);
    }
    return garage;
  }

  async update(id: number, data: any) {
    const garage = await this.findOne(id);
    Object.assign(garage, data);
    return this.garagesRepository.save(garage);
  }

  async remove(id: number) {
    const garage: any = await this.findOne(id);
    await this.garagesRepository.remove(garage);
  }
}
