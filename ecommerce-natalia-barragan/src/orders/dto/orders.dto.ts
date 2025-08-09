// src/orders/dto/create-order.dto.ts
import {
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para cada producto dentro de la orden
export class ProductRefDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

// DTO para crear la orden
export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayMinSize(1) // mínimo 1 producto
  @ValidateNested({ each: true }) // valida cada objeto
  @Type(() => ProductRefDto) // transforma cada item a ProductRefDto
  products: ProductRefDto[];
}
