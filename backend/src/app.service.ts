import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { Repository } from 'typeorm';
import { foodAssets } from './assets/foods';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async run() {
    console.log('🌱 Iniciando el sembrado de productos...');

    for (const asset of foodAssets) {
      const exists = await this.productRepository.findOneBy({
        nombreProducto: asset.nombreProducto,
      });

      if (!exists) {
        const nuevo = this.productRepository.create(asset);
        await this.productRepository.save(nuevo);
        console.log(`✅ Producto creado: ${asset.nombreProducto}`);
      } else {
        await this.productRepository.delete(exists);
        const nuevo = this.productRepository.create(asset);
        await this.productRepository.save(nuevo);
        console.log(`✅ Producto creado: ${asset.nombreProducto}`);
      }
    }

    console.log('🏁 Proceso terminado.');
  }
}
