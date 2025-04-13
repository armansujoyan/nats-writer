import { join } from 'path';
import { ApiConfigService } from 'src/config/config.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ApiConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, username, password, database } =
      this.configService.databaseConfig;

    return {
      type: 'postgres',
      entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
      migrationsTableName: 'migration',
      migrations: [join(__dirname, 'database/migrations/*.ts')],
      host,
      username,
      password,
      database,
      ...(!this.configService.isProduction ? { port } : {}),
      extra: !this.configService.isDevelopment
        ? {
            socketPath: host,
          }
        : {},
      namingStrategy: new SnakeNamingStrategy(),
      synchronize:
        this.configService.isDevelopment && this.configService.syncDatabase,
      logging:
        this.configService.isDevelopment &&
        this.configService.logDatabaseQueries,
    };
  }
}
