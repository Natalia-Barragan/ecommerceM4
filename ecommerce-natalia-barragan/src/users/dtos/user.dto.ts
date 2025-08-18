import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";
import { Orders } from "src/orders/entities/orders.entity";

export class CreateUserDto{

    @ApiHideProperty()
    id:string;
    @ApiHideProperty()
    orders: Orders[];
    
    /**
     * Debe ser un string entre 3 y 50 caracteres
     * @example 'Test User'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    /**
     * Debe ser un email de formato válido y con un max de 50 caracteres
     * @example 'Test.user@example.com'
     */
    @IsNotEmpty()
    @MaxLength(50)
    @IsEmail()
    email: string;

    /**
     * Debe tener al menos una minúscula, una mayúscula, un número y un símbolo
     * @example 'Password123!'
     */
    @IsNotEmpty()
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,        
    },{
        message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un simbolo (@, _, -, !).',
    })
    @MinLength(8)
    @MaxLength(20)
    password: string;

    /**
     * Debe ser igual al password
     * @example 'Password123!'
     */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    /**
     * Debe tener entre 3 y 80 caracteres
     * @example 'calle falsa 123!'
     */
    @IsString()
    @MinLength(3)
    @MaxLength(80)    
    address: string;

   /**
   * Debe ser un número
   * @example '1112345678'
   */
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /**
     * Debe tener entre 5 y 20 caracteres
     * @example 'Argentina!'
     */
    @MinLength(5)
    @MaxLength(20)
    country: string;
    
    /**
     * Debe tener entre 5 y 20 caracteres
     * @example 'La Plata, Bs As!'
     */
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @ApiHideProperty()
    @IsEmpty()
    isAdmin: boolean;
}

export class UpdateUserDto {

  /**
   * Debe ser un string entre 3 y 50 caracteres
   * @example 'Test User'
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  /**
   * Debe tener al menos una minúscula, una mayúscula, un número y un símbolo
   * @example 'Password123!'
   */
  @IsOptional()
  @IsStrongPassword(
    { minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1 },
    { message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un símbolo (@, _, -, !).' },
  )
  @MinLength(8)
  @MaxLength(20)
  password: string;

  /**
   * Debe tener entre 3 y 80 caracteres
   * @example 'calle falsa 123!'
   */
  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un número
   * @example '54 11 1234 5678'
   */
  @IsOptional()
  @IsNumber()
  phone: number;

  /**
   * Debe tener entre 5 y 20 caracteres
   * @example 'Argentina!'
   */
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**
   * Debe tener entre 5 y 20 caracteres
   * @example 'La Plata, Buenos Aires!'
   */
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;

}

export class LoginUserDto {
  /**
   * Debe ser un email de formato válido y con un max de 50 caracteres
   * @example 'Test.user@example.com'
   */
  @IsNotEmpty({
    message: 'El email es obligatorio.',
  })
  @MaxLength(50)
  @IsEmail()
  email: string;

  /**
   * Debe tener al menos una minúscula, una mayúscula, un número y un símbolo
   * @example 'Password123!'
   */
  @IsNotEmpty({
    message: 'La contraseña es obligatoria.',
  })
  @MinLength(8)
  @MaxLength(20)
  @IsStrongPassword(
    { minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1 },
    { message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un símbolo (@, _, -, !).' },
  )
  password: string;
}
