import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import path from 'path';

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

export const AppDataSource = new DataSource({
     type: 'postgres',
    host: process.env.DB_HOST || '',
    port,
    username: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || '',
    entities: [path.join(__dirname, '../../modules/**/database/entities/*.{ts,js}')],
    migrations: ['./src/shared/typeorm/migrations/*.{ts,js}'],
});
