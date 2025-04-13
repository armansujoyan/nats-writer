import * as Joi from 'joi';
import * as process from 'process';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logs: boolean;
  sync: boolean;
}

export interface Nats {
  url: string;
}

export const environmentValidationSchema = Joi.object({
  PORT: Joi.number().default(4000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DATABASE_LOGGING: Joi.boolean(),
  DATABASE_SYNC: Joi.boolean(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_PORT: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  NATS_URL: Joi.string().required(),
});

export default () => ({
  port: parseInt(process.env.PORT, 10),
  environment: process.env.NODE_ENV,
  database: {
    logs: process.env.DATABASE_LOGGING === 'true',
    sync: process.env.DATABASE_SYNC === 'true',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  nats: {
    url: process.env.NATS_URL,
  },
});
