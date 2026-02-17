import { Controller, Get, Param } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { OrderResponseDto } from './entities/OrderDesponseDto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Lista de turnos obtenida con éxito',
    type: [OrderResponseDto],
  })
  async findAll() {
    return this.shiftsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') numberTicker?: number) {
    return this.shiftsService.findOne(+numberTicker!);
  }
}
