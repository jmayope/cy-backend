import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('types')
export class Type {
  
  @PrimaryColumn({ 
    type: 'int', 
    generated: 'identity' 
  })
  @Generated('increment')
  id: number;

  @Column()
  category: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'jsonb',
    nullable: true, // or false, depending on your requirements
    // For PostgreSQL, setting array: false explicitly can prevent issues with jsonb[] type inference
    array: false, 
    // You can also set a default value if needed, e.g., default: () => "'{}'"
  })
  additional_fields: string;

  @Column()
  is_active: boolean;

  @Column()
  is_system: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

}
