import {
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductRefDto {
  /**
   * UUID v4 generado por BD
  */
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class CreateOrderDto {

  /**
   * UUID v4 generado por BD en User
  */
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * Array de productos
   * @example '[
      { id: '52797d63-76c4-4eeb-88b4-a1e4df5d6803' },
      { id: '1d2c3b4a-5e6f-7a89-b0c1-2d3e4f5a6b7c' },
    ]'
   */
  @IsArray()
  @ArrayMinSize(1) 
  @ValidateNested({ each: true }) 
  @Type(() => ProductRefDto) 
  products: ProductRefDto[];
}
