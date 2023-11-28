import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product-service.service';
import { ProductDto } from './dto/product.dto';

@Controller()
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductService) {}

  @Post('create')
  create(): string {
    return this.productServiceService.create();
  }
}
