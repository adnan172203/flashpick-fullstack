import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product-service.service';
import { ProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductServiceController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Get('')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
