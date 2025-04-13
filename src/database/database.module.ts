import { ApiConfigModule } from 'src/config/config.module';
import { ApiConfigService } from 'src/config/config.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from './type-orm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class DatabaseModule {}
