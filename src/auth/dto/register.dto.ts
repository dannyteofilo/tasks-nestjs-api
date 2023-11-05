import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDTO {
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
