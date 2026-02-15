import { IsNumber, IsPositive, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty({ message: 'el nombre del producto es obligatorio' })
  nombreProducto!: string;

  @IsNumber()
  @IsPositive({ message: 'La cantidad debe ser mayor a 0' })
  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  cantidad!: number;

  @IsNumber({}, { message: 'El precio unitario debe ser un número' })
  @IsPositive({ message: 'El precio unitario debe ser un valor positivo' })
  @IsNotEmpty({ message: 'El precio unitario es obligatorio' })
  precioUnitario!: number;

  @IsUUID('all', { message: 'El ID del producto debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
  product!: string;
}
