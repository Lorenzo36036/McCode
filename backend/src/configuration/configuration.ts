import { registerAs } from '@nestjs/config';

export const dataBaseConfig = registerAs('database', () => ({
  type: 'postgres' as const,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  synchronize: true,
  autoLoadEntities: true,
}));
