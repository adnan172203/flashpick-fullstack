import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@app/common';
import * as bcrypt from 'bcryptjs';
import { HttpException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => {
      // Mock the bcrypt.hash function with an asynchronous function
      return 'hashedPassword';
    });
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => {
      // Mock the bcrypt.compare function with an asynchronous function
      return 'hashedPassword';
    });

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should check signup method', () => {
    expect(authService.signUp).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a new user when the email is not in use', async () => {
      // Mock the PrismaService user.findUnique to return null, indicating the email is not in use.
      prismaService.user.findUnique = jest.fn().mockResolvedValue(null);

      const signupParams = {
        name: 'Test User',
        email: 'test1@example.com',
        password: 'password123',
      };

      // Mock the PrismaService user.create to return a user.
      prismaService.user.create = jest.fn().mockResolvedValue({
        id: 1,
        ...signupParams,
      });

      const result = await authService.signUp(signupParams);

      expect(result).toBeDefined();

      // expect(jwt.verify(result, process.env.JSON_TOKEN_KEY)).toBeDefined();
    });

    it('should hash the password before storing it in the database', () => {
      const signupParams = {
        name: 'Test User',
        email: 'test1@example.com',
        password: 'password123',
      };

      expect(bcrypt.hash).toHaveBeenCalledWith(signupParams.password, 10);
    });

    it('should throw a ConflictException when the email is already in use', async () => {
      // Mock the PrismaService user.findUnique to return an existing user.
      prismaService.user.findUnique = jest.fn().mockResolvedValue({});

      const signupParams = {
        name: 'Test User',
        email: 'test1@example.com',
        password: 'password123',
      };

      try {
        await authService.signUp(signupParams);
      } catch (error) {
        expect(error).toBe('Username or email already exists');
      }
    });
  });

  describe('signin', () => {
    it('should throw an exception when user is not found', async () => {
      const signinParams = {
        email: 'test1@example.com',
        password: 'password123',
      };

      prismaService.user.findUnique = jest.fn().mockResolvedValue(null);

      const result = authService.signIn(signinParams);

      await expect(result).rejects.toThrow(
        new HttpException('Invalid credentials', 400)
      );
    });

    it('should throw an exception when password is incorrect', async () => {
      const signinParams = {
        email: 'test1@example.com',
        password: 'password123',
      };

      const mockParams = {
        id: 1,
        name: 'John Doe',
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      prismaService.user.findUnique = jest.fn().mockResolvedValue(mockParams);

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.signIn(signinParams)).rejects.toThrow(
        new HttpException('Invalid credentials', 400)
      );
    });

    it('should login user and return the token', async () => {
      const signinParams = {
        email: 'test1@example.com',
        password: 'password123',
      };
      // Mock the PrismaService user.findUnique to return null, indicating the email is in use.
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue(signinParams.email);

      const result = await authService.signIn(signinParams);

      expect(result).toBeDefined();
    });
  });
});
