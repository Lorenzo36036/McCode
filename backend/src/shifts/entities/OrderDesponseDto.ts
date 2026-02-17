import { ApiProperty } from '@nestjs/swagger';

export class OrderResponseDto {
  @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  id!: string;

  @ApiProperty({ example: 'Lorenzo' })
  nombreConsumidor!: string;

  @ApiProperty({ example: 843 })
  numeroTicket!: number;

  @ApiProperty({ example: 'pendiente' })
  estado!: string;

  @ApiProperty({ example: '2026-02-16T03:12:18.911Z' })
  fechaCompra!: Date;
}
