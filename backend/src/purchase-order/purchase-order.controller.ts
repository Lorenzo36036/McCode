import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete
} from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/interface/roles';

@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post()
  create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrderService.create(createPurchaseOrderDto);
  }

  @Auth(Role.Admin)
  @Get()
  findAll() {
    return this.purchaseOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderService.findOne(id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ) {
    return this.purchaseOrderService.update(id, updatePurchaseOrderDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.purchaseOrderService.remove(+id);
  // }
}
