import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@app/common';
// import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(async (password: string, saltOrRounds: number) => {
        // Mock the bcrypt.hash function with an asynchronous function
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
});
