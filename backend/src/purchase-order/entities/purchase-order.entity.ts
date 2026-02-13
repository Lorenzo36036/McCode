import { OrderDetail } from '@/order-details/entities/order-detail.entity';
import { OneToMany } from 'typeorm';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

enum OrderStatus {
  PENDIENTE = 'pendiente',
  PREPARANDO = 'preparando',
  LISTO = 'listo',
  RETIRADO = 'retirado',
  CANCELADO = 'cancelado',
}

@Entity('orden_de_compra')
export class PurchaseOrder {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'nombre_consumidor' })
  nombreConsumidor!: string;

  @Column({ name: 'numero_ticket' })
  numeroTicket!: string;

  @Column()
  cantidad!: number;

  @Column({ name: 'precio_total', type: 'decimal', precision: 10, scale: 2 })
  precioTotal!: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDIENTE,
  })
  estado!: OrderStatus;

  @CreateDateColumn({ name: 'fecha_compra' })
  fechaCompra!: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.PurchaseOrder, {
    cascade: true,
  })
  orderDetail!: OrderDetail[];
}
