import { Module } from '@nestjs/common';
import { NatsModule } from 'src/nats/nats.module';
import { MessageService } from './business/message.service';
import { ApiConfigModule } from 'src/config/config.module';
import { MessageController } from './api/message.controller';
import { MessageRepository } from './data/message.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './data/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), NatsModule, ApiConfigModule],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService],
})
export class MessageModule {}
