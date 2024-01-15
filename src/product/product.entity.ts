import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/base-entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'text' })
  image: string;
}
