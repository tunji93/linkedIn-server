import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { config } from 'dotenv';

import { DataSource, DataSourceOptions } from 'typeorm';

import { EnvConfig } from '../config/config.env';

import { TypeOrmNamingStrategy } from './typeorm-naming-strategy';

config();

const env = plainToClass(
  EnvConfig,
  { ...EnvConfig.getDefaultObject(), ...process.env },
  { enableImplicitConversion: true },
);
const errors = validateSync(env, { whitelist: true });
if (errors.length > 0) {
  // eslint-disable-next-line no-console
  console.error(JSON.stringify(errors, undefined, '  '));
  throw new Error('Invalid env.');
}

export const options: DataSourceOptions = {
  type: 'postgres',
  host: env.TYPEORM_HOST,
  port: env.TYPEORM_PORT,
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  namingStrategy: new TypeOrmNamingStrategy(),
  logging: env.TYPEORM_LOGGING,
  ssl: env.NODE_ENV === 'test',
  synchronize: false,
};

export default new DataSource(options);
