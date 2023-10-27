import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../shared/base-entity';

import { Orders } from '../order/order.entity';

enum UserRole {
  CUSTOMER = 'customer',
  WORKER = 'worker',
}

@Entity()
export class Users extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @OneToMany(() => Orders, (orders) => orders.owner, {
    cascade: true,
  })
  orders: Orders[];
}
