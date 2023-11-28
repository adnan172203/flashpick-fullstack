import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  create(): string {
    return 'product created';
  }
}
