import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product-service.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImageGallery } from './entities/product-image-gallery.entity';
import { NotFoundException } from '@nestjs/common';

// type MockRepositoryType<T = any> = Partial<
//   Record<keyof Repository<T>, jest.Mock>
// >;

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
  findOne: jest.fn(),
};

// const mockProduct = {
//   id: '1',
//   name: 'product one',
//   description: 'product one description',
//   price: 2,
//   quantity: 2,
//   sku: '12',
//   color: 'red',
//   size: 'sdf',
//   stock: 12,
//   status: true,
//   fullDescription: 'sdf',
//   additionalText: 'sdf',
//   images: [{ imageUrl: 'three.jpg' }, { imageUrl: 'three-another.jpg' }],
//   productId: "123"
// };

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
  images: [
    { productId: '123', imageUrl: 'three.jpg' },
    { productId: '123', imageUrl: 'three-another.jpg' },
  ],
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
        {
          provide: getRepositoryToken(ProductImageGallery), // Provide ProductImageGallery repository
          useValue: mockRepository, // You can use the same mockRepository or create another mock for ProductImageGallery
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    // productRepository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create Product', () => {
    describe('when pass product params', () => {
      it('should create a new product', async () => {
        mockRepository.save.mockReturnValue(mockProduct);

        const savedProduct = await service.createProduct(mockProduct);

        expect(savedProduct).toBe(mockProduct);
      });
    });
  });
  describe('update Product', () => {
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

  describe('delete Product', () => {
    it('should be defined', async () => {
      expect(service.deleteProduct).toBeDefined();
    });

    describe('when pass id', () => {
      it('should delete the product', async () => {
        const exisProduct = new Product();
        exisProduct.id = '1';
        exisProduct.name = 'Mock Product';
        exisProduct.description = 'Mock Description';
        exisProduct.price = 20;

        mockRepository.findOneBy.mockReturnValue(exisProduct);

        await service.deleteProduct('1');

        expect(mockRepository.remove).toHaveBeenCalledWith(exisProduct);
      });
    });
    describe('otherwise', () => {
      it('should throw NotFoundException for non-existing product', async () => {
        mockRepository.findOneBy.mockReturnValue(null);

        await expect(service.deleteProduct('456')).rejects.toThrow(
          NotFoundException
        );
      });
    });
  });

  describe('get all products', () => {
    it('should be defined', () => {
      expect(service.getAllProducts).toBeDefined();
    });

    describe('when request', () => {
      const products = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ];
      it('should fetch all products', async () => {
        mockRepository.find.mockReturnValue(products);

        const result = await service.getAllProducts();

        expect(result).toEqual(products);
      });
      it('should return an empty array if no products are found', async () => {
        mockRepository.find.mockReturnValue([]);

        const result = await service.getAllProducts();

        expect(result).toEqual([]);
      });
    });
  });

  describe('get product', () => {
    it('should be defined', () => {
      expect(service.getProduct).toBeDefined();
    });

    describe('when request with id', () => {
      it('should fetch the product', async () => {
        const expectedProduct = new Product();
        expectedProduct.id = '1';
        expectedProduct.name = 'Mock Product';
        expectedProduct.description = 'Mock Description';
        expectedProduct.price = 20;

        mockRepository.findOne.mockReturnValue(expectedProduct);

        const result = await service.getProduct('1');

        expect(result).toEqual(expectedProduct);
      });
    });
    describe('when request with wrong id', () => {
      // Should throw a NotFoundException if product with given id does not exist
      it('should throw a NotFoundException if product with given id does not exist', async () => {
        const productId = '1';

        mockRepository.findOne.mockResolvedValue(undefined);

        await expect(service.getProduct(productId)).rejects.toThrow(
          NotFoundException
        );
        expect(mockRepository.findOne).toHaveBeenCalledWith({
          where: { id: productId },
          relations: ['images'],
        });
      });
    });
  });
});
