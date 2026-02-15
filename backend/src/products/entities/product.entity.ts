import { OrderDetail } from '@/order-details/entities/order-detail.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';

export enum ProductType {
  COMIDA = 'comida',
  BEBIDA = 'bebida',
}

@Entity('productos_en_venta')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'nombre_producto' })
  nombreProducto!: string;

  @Column({ name: 'precio_unitario', type: 'float' })
  precioUnitario!: number;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.COMIDA,
  })
  tipo!: ProductType;

  @Column({ name: 'imagen_url' })
  imagenUrl!: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail!: OrderDetail[];
}
