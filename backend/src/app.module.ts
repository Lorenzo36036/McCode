import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseConfig } from '@/configuration/configuration'; // Tu alias @ funciona aquí
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { ProductsModule } from './products/products.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { AppService } from './app.service';
import { Product } from './products/entities/product.entity';
import { ShiftsModule } from './shifts/shifts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dataBaseConfig],
    }),

    TypeOrmModule.forFeature([Product]),
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
    ShiftsModule,
    AuthModule,
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
