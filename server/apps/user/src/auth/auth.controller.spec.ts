import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '@app/common';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('signup', () => {
    const signupParams = {
      name: 'Test User',
      email: 'test1@example.com',
      password: 'password123',
    };
    it('should return a token', () => {
      expect(authController.signUp(signupParams)).toBeDefined();
    });
  });
  describe('signin', () => {
    const signinParams = {
      email: 'test1@example.com',
      password: 'password123',
    };
    it('should return a token', () => {
      expect(authController.signIn(signinParams)).toBeDefined();
    });
  });
});
