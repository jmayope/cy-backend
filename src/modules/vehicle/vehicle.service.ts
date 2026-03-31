import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { SupabaseConfig } from 'src/config/supabase.config';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    private supabaseConfig: SupabaseConfig
  ) {}

  async create(data: any): Promise<Vehicle> {
    
    const type = this.vehiclesRepository.create({
      garage_id: data.garage_id,
      user_id: data.user_id,
      license_plate: data.license_plate,
      brand: data.brand,
      model: data.model,
      color: data.color,
      type: data.type,
      is_active: data.is_active || true,
    });

    return this.vehiclesRepository.save(type);
    
  }

  async findAll(where: any): Promise<Vehicle[]> {
    return this.vehiclesRepository.find({where: where});
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne({where: {id}});
    if (!vehicle) {
      throw new NotFoundException(`Garage with ID ${id} not foung`);
    }
    return vehicle;
  }

  async update(id: number, data: any) {
    const vehicle = await this.findOne(id);
    Object.assign(vehicle, data);
    return this.vehiclesRepository.save(vehicle);
  }

  async remove(id: number) {
    const vehicle: any = await this.findOne(id);
    await this.vehiclesRepository.remove(vehicle);
  }
}
