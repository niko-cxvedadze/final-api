import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/shared/base-entity';

import { Product } from 'src/product/product.entity';
import { Users } from 'src/users/users.entity';

@Entity()
export class CartProduct extends BaseEntity {
  @Column()
  product_id: string;

  @Column()
  user_id: string;

  @Column({ default: 1 })
  count: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  cartProduct: Product;
}
