import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('payments')
export class Payment {

  @PrimaryColumn({ 
    type: 'int', 
    generated: 'identity' 
  })
  @Generated('increment')
  id: number;

  @Column()
  garage_id: number;

  @Column()
  reservation_id: number;

  @Column()
  method: string;

  @Column()
  status: string;

  @Column()
  amount: number;

  @Column()
  paid_at: Date;

  @Column()
  external_reference: string;

  @Column()
  currency: string;

  @Column()
  is_active: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

}
