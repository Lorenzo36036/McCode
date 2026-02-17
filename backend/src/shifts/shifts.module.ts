import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { PurchaseOrderModule } from '@/purchase-order/purchase-order.module';

@Module({
  imports: [PurchaseOrderModule],
  controllers: [ShiftsController],
  providers: [ShiftsService],
})
export class ShiftsModule {}
