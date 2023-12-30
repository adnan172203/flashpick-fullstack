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
  create(@Body() body: ProductDto) {
    return this.productService.createProduct(body);
  }

  @Get('')
  getAllProducts() {
    return this.productService.getAllProducts();
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
