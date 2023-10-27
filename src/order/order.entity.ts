import { BaseEntity } from '../shared/base-entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { Users } from '../users/users.entity';

@Entity()
export class Orders extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  owner_id: string;

  @ManyToOne(() => Users, (user) => user.orders, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'owner_id',
  })
  owner: Users;
}
