import { IsNumber } from "class-validator";
import { ColumnIntegerTransformer } from "src/common/column.integer.transformer";
import { ColumnNumericTransformer } from "src/common/column.numeric.transformer";
import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('spaces')
export class Space {

  @PrimaryColumn({ 
    type: 'int', 
    generated: 'identity',
    transformer: new ColumnIntegerTransformer()
  })
  @Generated('increment')
  id: number;

  @Column()
  garage_id : number;

  @Column()
  code : string;

  @Column()
  status : string;

  // @Column()
  @Column('decimal', { 
    precision: 10,  // Número total de dígitos (enteros + decimales)
    scale: 2,       // Número de dígitos después del punto decimal
    transformer: new ColumnNumericTransformer(),
  })
  hourly_rate : number;

  @Column()
  display_order : number;

  @Column()
  is_active : boolean;

  @Column()
  created_at : Date;

  @Column()
  updated_at : Date;
}
