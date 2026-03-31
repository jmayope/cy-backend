import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { SupabaseConfig } from 'src/config/supabase.config';
import moment from 'moment';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    private supabaseConfig: SupabaseConfig
  ) {}

  async create(data: any): Promise<Reservation> {
    const reservation = this.reservationsRepository.create({
      garage_id: data.garage_id,
      vehicle_id: data.vehicle_id,
      space_id: data.space_id,
      operator_entry_id: data.operator_entry_id,
      operator_exit_id: data.operator_exit_id,
      entry_time: data.entry_time || moment().format("HH:mm:ss"),
      exit_time: data.exit_time,
      status: data.status,
      calculated_cost: data.calculated_cost || 0,
      price_per_hour: data.price_per_hour || 0,
      notes: data.notes,
      is_active: data.is_active || true,
    });

    return this.reservationsRepository.save(reservation);
    
  }

  async findAll(where: any): Promise<Reservation[]> {
    return this.reservationsRepository.find({where: where});
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({where: {id}});
    if (!reservation) {
      throw new NotFoundException(`Garage with ID ${id} not foung`);
    }
    return reservation;
  }

  async update(id: number, data: any) {
    const reservation = await this.findOne(id);
    data.updated_at = moment();
    Object.assign(reservation, data);
    return this.reservationsRepository.save(reservation);
  }

  async remove(id: number) {
    const reservation: any = await this.findOne(id);
    await this.reservationsRepository.remove(reservation);
  }
}
