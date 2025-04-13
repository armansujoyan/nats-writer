import { Module } from '@nestjs/common';
import { NatsModule } from 'src/nats/nats.module';
import { MessageService } from './message.service';
import { ApiConfigModule } from 'src/config/config.module';
import { MessageController } from './message.controller';

@Module({
  imports: [NatsModule, ApiConfigModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
