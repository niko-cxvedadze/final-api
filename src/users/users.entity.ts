import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { BaseEntity } from '../shared/base-entity';

export enum UserRole_Enum {
  CUSTOMER = 'customer',
  WORKER = 'worker',
}

@Entity()
@Unique(['email'])
@Unique(['phone_number'])
export class Users extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column()
  email: string;

  @Column({ default: false })
  verified: boolean;

  @Column({
    type: 'enum',
    enum: UserRole_Enum,
    nullable: true,
  })
  role: UserRole_Enum;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  refresh_token: string;
}
