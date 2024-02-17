import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImageGallery } from './entities/product-image-gallery.entity';

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
  images?: ProductImage[];
}

interface ProductImage {
  productId: string;
  imageUrl: string;
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
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImageGallery)
    private readonly productImageRepository: Repository<ProductImageGallery>
  ) {}

  async createProduct({ ...product }: ProductParams) {
    let { images } = product;
    const newProduct = this.productRepository.create(product);

    const savedProduct = await this.productRepository.save(newProduct);

    this.createProductWithImage(savedProduct.id, images);

    return savedProduct;
  }

  async getAllProducts() {
    return this.productRepository.find({ relations: ['images'] });
  }

  async getProduct(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
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

  private async createProductWithImage(
    productId: string,
    productImages: ProductImage[]
  ) {
    const promiseItems = productImages.map(({ imageUrl }: ProductImage) => {
      return this.productImageRepository.save({
        productId,
        imageUrl,
      });
    });

    await Promise.all(promiseItems);
  }
}
