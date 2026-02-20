// src/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seeder = app.get(AppService);

  await seeder.run();

  await app.close();
}

runSeed();
