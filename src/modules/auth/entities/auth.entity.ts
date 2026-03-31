import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('users')
export class Auth {
  @PrimaryColumn({ 
    type: 'int', 
    generated: 'identity' 
  })
  @Generated('increment')
  id: number;

  @Column()
  garage_id: number;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  full_name: string;

  @Column()
  phone_number: string;

  @Column()
  role: string;

  @Column()
  is_active: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
