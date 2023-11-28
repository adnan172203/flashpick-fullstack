import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product-service.service';
import { PrismaService } from '@app/common';

describe('Product Service', () => {
  let productService: ProductService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    // jest.spyOn(bcrypt, 'hash').mockImplementation(async () => {
    //   // Mock the bcrypt.hash function with an asynchronous function
    //   return 'hashedPassword';
    // });
    // jest.spyOn(bcrypt, 'compare').mockImplementation(async () => {
    //   // Mock the bcrypt.compare function with an asynchronous function
    //   return 'hashedPassword';
    // });

    productService = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });
});
