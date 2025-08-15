import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";
import { Categories } from "src/categories/categories.entity";

export class UpDateProductDto {

    @ApiHideProperty()
    @IsEmpty({ message: 'El nombre no se puede modifcar' })
    name?: string;

    /**
     * Debe ser un string de al menos 10 caracteres
     * @example 'Descripcion del producto'
     */
    @IsString()
    @IsOptional()
    @MinLength(10)
    description?: string;

    /**
     * Debe ser un numero mayor o igual a 0 
     */    
    @IsNumber()
    @IsOptional()
    @Min(0)
    price?: number;

    /**
     * Debe ser un numero mayor o igual a 0
     */
    @IsNumber()
    @IsOptional()
    @Min(0)
    stock?: number;

    @ApiHideProperty()
    @IsEmpty({ message: 'La categoria no se puede modifcar' })
    category?: Categories;
}