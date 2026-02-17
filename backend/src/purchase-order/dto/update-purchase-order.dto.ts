import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseOrderDto } from './create-purchase-order.dto';
import { IsEnum } from 'class-validator';

export enum OrderStatus {
  PENDIENTE = 'pendiente',
  PREPARANDO = 'preparando',
  LISTO = 'listo',
  RETIRADO = 'retirado',
  CANCELADO = 'cancelado',
}

export class UpdatePurchaseOrderDto extends PartialType(
  CreatePurchaseOrderDto,
) {
  @IsEnum(OrderStatus, {
    message: 'El estado debe ser uno de los valores permitidos',
  })
  estado!: OrderStatus;
}
