import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly orderRepository: Repository<PurchaseOrder>,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const newOrder = this.orderRepository.create(createPurchaseOrderDto);

    const savedOrder = await this.orderRepository.save(newOrder);

    return {
      message: 'Se creó el pedido exitosamente',
      order: savedOrder,
      numeroTicket: savedOrder.numeroTicket,
    };
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['orderDetail', 'orderDetail.product'],
      order: {
        fechaCompra: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<PurchaseOrder> {
    const purchaseOrder = await this.orderRepository.findOne({ where: { id } });

    if (!purchaseOrder)
      throw new NotFoundException(`La orden de compra: ${id} no existe`);
    return purchaseOrder;
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    const purchaseOrder = await this.findOne(id);

    const updatedOrder = Object.assign(purchaseOrder, updatePurchaseOrderDto);
    await this.orderRepository.save(updatedOrder);

    return { message: 'Se actualizo el estado correctamente ' };
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrder`;
  }
}
