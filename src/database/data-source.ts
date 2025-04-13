import { join } from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const AppDataSource = new DataSource({
  type: 'postgres',
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrationsTableName: 'migration',
  migrations: [join(__dirname, 'migrations/*.ts')],
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // We connect using GCP Auth Proxy in dev environment
  // where we use a socket instead of a port and NODE_ENV is set to 'test'
  extra:
    process.env.NODE_ENV === 'testing'
      ? {
          socketPath: process.env.DATABASE_HOST,
        }
      : {},
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
