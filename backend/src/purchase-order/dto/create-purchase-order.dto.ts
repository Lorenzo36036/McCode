import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDetailDto } from '@/order-details/dto/create-order-detail.dto';

export enum OrderStatus {
  PENDIENTE = 'pendiente',
  PREPARANDO = 'preparando',
  LISTO = 'listo',
  RETIRADO = 'retirado',
  CANCELADO = 'cancelado',
}

export class CreatePurchaseOrderDto {
  @IsString()
  @IsNotEmpty({
    message: 'No puede estar vacio la propiedad nombre_consumidor',
  })
  nombreConsumidor!: string;

  @IsString()
  @IsNotEmpty({ message: 'No puede estar vacio la propiedad numeroTicket' })
  numeroTicket!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'No puede estar vacio la propiedad cantidad' })
  cantidad!: number;

  @IsNumber()
  @IsNotEmpty({ message: 'No puede estar vacio la propiedad precioTotal' })
  precioTotal!: number;

  @IsEnum(OrderStatus, {
    message: 'El estado debe ser uno de los valores permitidos',
  })
  estado!: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  @IsNotEmpty({ message: 'La orden debe tener al menos un producto' })
  orderDetail!: CreateOrderDetailDto[];
}
