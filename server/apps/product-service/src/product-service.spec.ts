import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product-service.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

// type MockRepositoryType<T = any> = Partial<
//   Record<keyof Repository<T>, jest.Mock>
// >;

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('Product Service', () => {
  // const productParams = {
  //   name: 'one',
  //   description: 'string',
  //   price: 2,
  //   quantity: 2,
  //   sku: '12',
  //   color: 'red',
  //   size: 'sdf',
  //   stock: 12,
  //   status: true,
  //   fullDescription: 'sdf',
  //   additionalText: 'sdf',
  // };

  // const mockRepository = {
  //   create: jest.fn().mockReturnValue({ ...productParams }),
  //   save: jest.fn().mockReturnValue({ ...productParams }),
  // };

  let service: ProductService;
  // let productRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    // productRepository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const mockProduct = {
      name: 'one',
      description: 'string',
      price: 2,
      quantity: 2,
      sku: '12',
      color: 'red',
      size: 'sdf',
      stock: 12,
      status: true,
      fullDescription: 'sdf',
      additionalText: 'sdf',
    };

    describe('when pass product params', () => {
      it('should create a new product', async () => {
        mockRepository.create.mockReturnValue(mockProduct);

        const savedProduct = await service.createProduct(mockProduct);

        expect(savedProduct).toMatchObject(mockProduct);
      });
    });
  });
});
