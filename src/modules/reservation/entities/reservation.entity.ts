import { ColumnIntegerTransformer } from "src/common/column.integer.transformer";
import { ColumnNumericTransformer } from "src/common/column.numeric.transformer";
import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('reservations')
export class Reservation {
  @PrimaryColumn({ 
    type: 'int', 
    generated: 'identity',
    transformer: new ColumnIntegerTransformer()
  })
  @Generated('increment')
  id: number;

  @Column()
  garage_id: number;

  @Column()
  vehicle_id: number;

  @Column()
  space_id: number;

  @Column()
  operator_entry_id: number;

  @Column()
  operator_exit_id: number;

  @Column('time')
  entry_time: Date;

  @Column('time')
  exit_time: Date;

  @Column()
  status: string;

  @Column('decimal', { 
    precision: 10,  // Número total de dígitos (enteros + decimales)
    scale: 2,       // Número de dígitos después del punto decimal
    transformer: new ColumnNumericTransformer(),
  })
  calculated_cost: number;

  @Column('decimal', { 
    precision: 10,  // Número total de dígitos (enteros + decimales)
    scale: 2,       // Número de dígitos después del punto decimal
    transformer: new ColumnNumericTransformer(),
  })
  price_per_hour: number;

  @Column()
  notes: string;

  @Column()
  is_active: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
