import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product-service.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';

// type MockRepositoryType<T = any> = Partial<
//   Record<keyof Repository<T>, jest.Mock>
// >;

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
};

const mockProduct = {
  id: '1',
  name: 'product one',
  description: 'product one description',
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

describe('Product Service', () => {
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
    describe('when pass product params', () => {
      it('should create a new product', async () => {
        mockRepository.save.mockReturnValue(mockProduct);

        const savedProduct = await service.createProduct(mockProduct);

        expect(savedProduct).toBe(mockProduct);
      });
    });
  });
  describe('update', () => {
    describe('when update the product id with params', () => {
      it('should update the product', async () => {
        const newProudct = new Product();
        newProudct.id = '1';
        newProudct.name = 'Mock Product';
        newProudct.description = 'Mock Description';
        newProudct.price = 20;

        mockRepository.findOneBy.mockReturnValue(newProudct);
        mockRepository.save.mockReturnValue(newProudct);

        const updatedProduct = { name: 'Updated Name' };

        const savedProduct = await service.updateProduct('1', updatedProduct);

        expect(savedProduct.id).toBeDefined();
      });
    });
    describe('otherwise', () => {
      it('should throw a NotFoundException if the product is not found', async () => {
        mockRepository.findOneBy.mockReturnValue(null);
        await expect(service.updateProduct('456', {})).rejects.toThrow(
          NotFoundException
        );
      });
    });
  });
});
