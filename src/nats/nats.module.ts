import { Module } from '@nestjs/common';
import { ApiConfigModule } from 'src/config/config.module';
import { NATS_CLIENT } from './nats.constants';
import { natsFactory } from './nats.factory';
import { ApiConfigService } from 'src/config/config.service';

@Module({
  imports: [ApiConfigModule],
  providers: [
    {
      inject: [ApiConfigService],
      provide: NATS_CLIENT,
      useFactory: natsFactory,
    },
  ],
  exports: [NATS_CLIENT],
})
export class NatsModule {}
