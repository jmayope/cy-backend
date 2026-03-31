import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('garages')
export class Garage {
  
  @PrimaryColumn({ 
    type: 'int', 
    generated: 'identity' 
  })
  @Generated('increment')
  id: number;

  @Column()
  business_name: string;

  @Column()
  tax_id: string;

  @Column()
  address: string;

  @Column()
  primary_phone: string;

  @Column()
  contact_email: string;

  @Column()
  logo_url: string;

  @Column({
    type: 'jsonb',
    nullable: true, // or false, depending on your requirements
    // For PostgreSQL, setting array: false explicitly can prevent issues with jsonb[] type inference
    array: false, 
    // You can also set a default value if needed, e.g., default: () => "'{}'"
  })
  settings: any;

  @Column()
  is_active: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

}
