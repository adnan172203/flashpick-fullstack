import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product-service.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductService) {}

  @Post('create')
  create(@Body() body: ProductDto) {
    return this.productServiceService.createProduct(body);
  }
}
