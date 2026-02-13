import { OrderDetail } from '@/order-details/entities/order-detail.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';

@Entity('productos_en_venta')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'nombre_producto' })
  nombreProducto!: string;

  @Column({ name: 'precio_unitario' })
  precioUnitario!: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail!: OrderDetail[];
}
