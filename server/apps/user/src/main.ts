import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
// import * as dotenv from 'dotenv';

// Load environment variables from .env file
// dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(3000);
}
bootstrap();
