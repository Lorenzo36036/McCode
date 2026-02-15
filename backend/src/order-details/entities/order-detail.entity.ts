import { Product } from '@/products/entities/product.entity';
import { PurchaseOrder } from '@/purchase-order/entities/purchase-order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orden_de_detalles')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'nombre_producto' })
  nombreProducto!: string;

  @Column()
  cantidad!: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario!: number;

  @ManyToOne(() => Product, (product) => product.orderDetail)
  @JoinColumn({ name: 'productos_en_ventas_id' })
  product!: Product;

  @ManyToOne(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.orderDetail)
  @JoinColumn({ name: 'orden_de_compra_id' })
  purchaseOrder!: PurchaseOrder;
}
