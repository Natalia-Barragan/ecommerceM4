import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";
import { Orders } from "src/orders/entities/orders.entity";

export class CreateUserDto{

    id:string;
    orders: Orders[];

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @MaxLength(50)
    @IsEmail()
    email: string;

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

    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    @IsString()
    @MinLength(3)
    @MaxLength(80)    
    address: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @MinLength(5)
    @MaxLength(20)
    city: string;

    //@IsBoolean()
    isAdmin: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsStrongPassword(
    { minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1 },
    { message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un símbolo (@, _, -, !).' },
  )
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsOptional()
  @IsNumber()
  phone: number;

  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  city: string;

}

export class LoginUserDto {
  @IsNotEmpty({
    message: 'El email es obligatorio.',
  })
  @MaxLength(50)
  @IsEmail()
  email: string;

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