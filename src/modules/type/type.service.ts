import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';
import { SupabaseConfig } from 'src/config/supabase.config';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private typesRepository: Repository<Type>,
    private supabaseConfig: SupabaseConfig
  ) {}

  async create(data: any): Promise<Type> {
    
    const type = this.typesRepository.create({
      category: data.category,
      code: data.code,
      name: data.name,
      description: data.description,
      additional_fields: data.additional_fields,
      is_active: data.is_active || true,
      is_system: data.is_system || true,
    });

    return this.typesRepository.save(type);
    
  }

  async findAll(where: any): Promise<Type[]> {
    return this.typesRepository.find({where: where});
  }

  async findOne(id: number): Promise<Type> {
    const type = await this.typesRepository.findOne({where: {id}});
    if (!type) {
      throw new NotFoundException(`Garage with ID ${id} not foung`);
    }
    return type;
  }

  async update(id: number, data: any) {
    const type = await this.findOne(id);
    Object.assign(type, data);
    return this.typesRepository.save(type);
  }

  async remove(id: number) {
    const type: any = await this.findOne(id);
    await this.typesRepository.remove(type);
  }
}
