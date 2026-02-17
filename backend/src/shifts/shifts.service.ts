import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from '@/purchase-order/entities/purchase-order.entity';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly orderRepository: Repository<PurchaseOrder>,
  ) {}

  async findAll() {
    const shifts = await this.orderRepository.find({
      select: {
        id: true,
        nombreConsumidor: true,
        numeroTicket: true,
        estado: true,
        fechaCompra: true,
      },
      order: {
        fechaCompra: 'DESC',
      },
    });

    return shifts;
  }

  async findOne(numberTicker?: number) {
    const ticket = await this.orderRepository.findOne({
      where: { numeroTicket: numberTicker },
      select: {
        id: true,
        nombreConsumidor: true,
        estado: true,
        numeroTicket: true,
      },
    });
    if (!ticket) throw new NotFoundException('El ticket no existe');
    return ticket;
  }
}
