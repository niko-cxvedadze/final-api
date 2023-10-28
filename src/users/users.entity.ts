import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { BaseEntity } from '../shared/base-entity';

import { Orders } from '../order/order.entity';

enum UserRole {
  CUSTOMER = 'customer',
  WORKER = 'worker',
}

@Entity()
@Unique(['email'])
@Unique(['sub_id'])
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
    enum: UserRole,
    nullable: true,
  })
  role: UserRole;

  @OneToMany(() => Orders, (orders) => orders.owner, {
    cascade: true,
  })
  orders: Orders[];

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  sub_id: string;
}
