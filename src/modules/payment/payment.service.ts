import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { SupabaseConfig } from 'src/config/supabase.config';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private supabaseConfig: SupabaseConfig
  ) {}

  async create(data: any): Promise<Payment> {
    
    const payment = this.paymentsRepository.create({
      garage_id: data.garage_id,
      reservation_id: data.reservation_id,
      method: data.method,
      status: data.status,
      amount: data.amount,
      paid_at: data.paid_at,
      external_reference: data.external_reference,
      currency: data.currency,
      is_active: data.is_active || true
    });

    return this.paymentsRepository.save(payment);
    
  }

  async findAll(where: any): Promise<Payment[]> {
    return this.paymentsRepository.find({where: where});
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({where: {id}});
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not foung`);
    }
    return payment;
  }

  async update(id: number, data: any) {
    const payment = await this.findOne(id);
    Object.assign(payment, data);
    return this.paymentsRepository.save(payment);
  }

  async remove(id: number) {
    const payment: any = await this.findOne(id);
    await this.paymentsRepository.remove(payment);
  }
}
