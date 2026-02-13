import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'El nombre del producto debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío' })
  @MinLength(3, { message: 'El nombre del producto es muy corto' })
  nombreProducto!: string;

  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @IsPositive({ message: 'El precio debe ser mayor a cero' })
  @IsNotEmpty({ message: 'El precio unitario es obligatorio' })
  precioUnitario!: number;
}
