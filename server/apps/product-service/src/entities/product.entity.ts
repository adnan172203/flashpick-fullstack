import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImageGallery } from './product-image-gallery.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  sku: string;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column()
  stock: number;

  @Column()
  status: boolean;

  @Column()
  fullDescription: string;

  @Column()
  additionalText: string;

  @OneToMany(() => ProductImageGallery, (image) => image.product)
  images: ProductImageGallery[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
