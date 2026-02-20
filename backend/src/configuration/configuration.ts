import { registerAs } from '@nestjs/config';

export const dataBaseConfig = registerAs('database', () => ({
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '6543', 10),
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  synchronize: true,
  autoLoadEntities: true,
  ssl: {
    rejectUnauthorized: false,
  },
}));
