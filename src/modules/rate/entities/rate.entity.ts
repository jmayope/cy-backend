import { ColumnIntegerTransformer } from "src/common/column.integer.transformer";
import { ColumnNumericTransformer } from "src/common/column.numeric.transformer";
import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('rates')
export class Rate {
  @PrimaryColumn({ 
    type: 'int', 
    generated: 'identity',
    transformer: new ColumnIntegerTransformer()
  })
  @Generated('increment')
  id: number;

  @Column()
  vehicle_type: string;

  @Column('decimal', { 
    precision: 10,  // Número total de dígitos (enteros + decimales)
    scale: 2,       // Número de dígitos después del punto decimal
    transformer: new ColumnNumericTransformer(),
  })
  regular_hour_amount: number;

  @Column('decimal', { 
    precision: 10,  // Número total de dígitos (enteros + decimales)
    scale: 2,       // Número de dígitos después del punto decimal
    transformer: new ColumnNumericTransformer(),
  })
  holiday_hour_amount: number;

  @Column()
  is_active: boolean;

  @Column()
  operator_create_id: number;

  @Column()
  created_at: Date;

  @Column()
  operator_update_id: number;

  @Column()
  updated_at: Date;
}
