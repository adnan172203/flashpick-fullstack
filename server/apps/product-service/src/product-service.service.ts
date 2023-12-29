import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

interface ProductParams {
  name: string;
  description: string;
  price: number;
  quantity: number;
  sku: string;
  color?: string;
  size?: string;
  stock: number;
  status: boolean;
  fullDescription: string;
  additionalText: string;
}
interface UpdateProductParams {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  sku?: string;
  color?: string;
  size?: string;
  stock?: number;
  status?: boolean;
  fullDescription?: string;
  additionalText?: string;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async createProduct({ ...product }: ProductParams) {
    const newProduct = this.productRepository.create(product);
    const savedProduct = await this.productRepository.save(newProduct);
    return savedProduct;
  }

  async updateProduct(id: string, { ...product }: UpdateProductParams) {
    const existingProduct = await this.productRepository.findOneBy({ id });

    if (!existingProduct) {
      throw new NotFoundException();
    }

    const updatedProduct = await this.productRepository.save({
      ...existingProduct,
      ...product,
    });

    return updatedProduct;
  }
}
