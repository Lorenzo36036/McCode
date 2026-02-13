import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseConfig } from '@/configuration/configuration'; // Tu alias @ funciona aquí
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { ProductsModule } from './products/products.module';
import { OrderDetailsModule } from './order-details/order-details.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dataBaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        if (!dbConfig) {
          throw new Error(
            '¡No se encontró la configuración de la base de datos!',
          );
        }

        return dbConfig;
      },
    }),
    PurchaseOrderModule,
    ProductsModule,
    OrderDetailsModule,
  ],
})
export class AppModule {}
