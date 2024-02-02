import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base-entity';
import { ProductCategory } from 'src/product-category/product-category.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'text' })
  image: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  salePrice: number;

  @Column()
  category_name: string;

  @ManyToOne(() => ProductCategory, { eager: true })
  @JoinColumn({ name: 'category_name', referencedColumnName: 'name' })
  category: ProductCategory;
}
