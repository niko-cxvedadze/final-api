import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/shared/base-entity';

import { Product } from 'src/product/product.entity';
import { Users } from 'src/users/users.entity';

@Entity()
export class LikedProduct extends BaseEntity {
  @Column()
  product_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  likedProduct: Product;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  likedByUser: Users;
}
