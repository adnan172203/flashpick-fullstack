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
    return await this.productRepository.save(newProduct);
  }

  async getAllProducts() {
    return this.productRepository.find();
  }

  async updateProduct(id: string, { ...product }: UpdateProductParams) {
    const existingProduct = await this.productRepository.findOneBy({ id });

    if (!existingProduct) {
      throw new NotFoundException('product not found');
    }

    const updatedProduct = await this.productRepository.save({
      ...existingProduct,
      ...product,
    });

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return this.productRepository.remove(product);
  }
}
