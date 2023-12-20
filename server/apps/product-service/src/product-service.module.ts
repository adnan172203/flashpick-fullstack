// import { config } from 'dotenv';
import { Module } from '@nestjs/common';
import { ProductServiceController } from './product-service.controller';
import { ProductService } from './product-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

// config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: configService.get('POSTGRES_HOST'),
    //   port: configService.get('POSTGRES_PORT'),
    //   username: configService.get('POSTGRES_USERNAME'),
    //   password: configService.get('POSTGRES_PASSWORD'),
    //   database: configService.get('POSTGRES_DATABASE'),
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   // entities: ['entity/*.entity.ts'],
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // }),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.POSTGRES_HOST,
    //   port: +process.env.POSTGRES_PORT,
    //   username: process.env.POSTGRES_USERNAME,
    //   password: process.env.POSTGRES_PASSWORD,
    //   database: process.env.POSTGRES_DATABASE,
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   // entities: ['entity/*.entity.ts'],
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // }),
    // inject: [ConfigService],
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductServiceController],
  providers: [ProductService],
})
export class ProductServiceModule {}
