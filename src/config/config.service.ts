import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DatabaseConfig, Environment, Message, Nats } from './environment';

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  get isProduction(): boolean {
    return (
      this.configService.get<string>('environment') === Environment.PRODUCTION
    );
  }

  get isDevelopment(): boolean {
    return (
      this.configService.get<string>('environment') === Environment.DEVELOPMENT
    );
  }

  get isTesting(): boolean {
    return this.configService.get<string>('environment') === Environment.TEST;
  }

  get port(): number {
    return this.configService.get<number>('port');
  }

  get databaseConfig(): DatabaseConfig {
    return this.configService.get<DatabaseConfig>('database');
  }

  get logDatabaseQueries(): boolean {
    return this.configService.get<DatabaseConfig>('database').logs;
  }

  get syncDatabase(): boolean {
    return this.configService.get<DatabaseConfig>('database').sync;
  }

  get natsConfig(): Nats {
    return this.configService.get<Nats>('nats');
  }

  get environment(): Environment {
    return this.configService.get<Environment>('environment');
  }

  get messageConfig(): Message {
    return this.configService.get<Message>('message');
  }

  public get<T = unknown>(path: string): T | undefined {
    return this.configService.get<T>(path);
  }
}
