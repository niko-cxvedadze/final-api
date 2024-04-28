import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../shared/base-entity';

@Entity()
export class Purchase extends BaseEntity {
  @Column()
  totalPrice: number;

  @Column()
  totalItems: number;

  @Column()
  user_id: string;
}
