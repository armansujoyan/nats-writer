import { Module } from '@nestjs/common';
import { ResourcesModule } from './resources/resources.module';
import { NatsModule } from './nats/nats.module';
import { ApiConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ResourcesModule, NatsModule, ApiConfigModule, DatabaseModule],
})
export class AppModule {}
