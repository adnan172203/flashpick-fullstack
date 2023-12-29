import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product-service.service';
import { ProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductService) {}

  @Post('create')
  create(@Body() body: ProductDto) {
    return this.productServiceService.createProduct(body);
  }
  @Put('/:id')
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productServiceService.updateProduct(id, body);
  }
}
