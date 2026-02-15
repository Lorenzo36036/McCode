import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MinLength,
  IsEnum,
} from 'class-validator';

export enum ProductType {
  COMIDA = 'comida',
  BEBIDA = 'bebida',
}

export class CreateProductDto {
  @IsString({ message: 'El nombre del producto debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío' })
  @MinLength(3, { message: 'El nombre del producto es muy corto' })
  nombreProducto!: string;

  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @IsPositive({ message: 'El precio debe ser mayor a cero' })
  @IsNotEmpty({ message: 'El precio unitario es obligatorio' })
  precioUnitario!: number;

  @IsEnum(ProductType, {
    message: 'El tipo debe ser uno de los valores permitidos ',
  })
  tipo!: string;

  @IsString({ message: 'La imagen del producto debe ser un texto' })
  @IsNotEmpty({ message: 'La imagen del producto no puede estar vacío' })
  imagenUrl!: string;
}
