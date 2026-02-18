import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @ApiProperty({ example: 'usuario@correo.com' })
  @IsEmail({}, { message: 'El formato del email es inválido' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
