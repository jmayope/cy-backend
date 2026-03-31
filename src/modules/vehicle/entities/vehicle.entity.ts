import { ColumnIntegerTransformer } from "src/common/column.integer.transformer";
import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('vehicles')
export class Vehicle {

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
  user_id: number;

  @Column()
  license_plate: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  type: string;

  @Column()
  is_active: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

}
