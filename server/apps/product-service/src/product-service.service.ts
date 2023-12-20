import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly usersRepository: Repository<Product>
  ) {}
  async createProduct({ ...product }: ProductParams) {
    const newProduct = this.usersRepository.create(product);

    this.usersRepository.save(newProduct);
    return newProduct;
  }
}
