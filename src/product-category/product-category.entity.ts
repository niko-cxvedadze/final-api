import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../shared/base-entity';

@Entity()
@Unique(['name'])
export class ProductCategory extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  image: string;
}
