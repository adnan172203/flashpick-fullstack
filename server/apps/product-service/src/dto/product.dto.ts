import { Transform } from 'class-transformer';
import { IsInt, IsBoolean } from 'class-validator';

export class ProductDto {
  name: string;

  description: string;

  //   @Transform((value) => parseFloat(value))
  @IsInt()
  price: number;

  @IsInt()
  quantity: number;

  sku: string;

  color: string;

  size: string;

  @IsInt()
  stock: number;

  @IsBoolean()
  status: boolean;

  fullDescription: string;

  additionalText: string;
}
