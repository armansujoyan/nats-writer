import { Module } from '@nestjs/common';
import { ApiConfigModule } from 'src/config/config.module';
import { NATS_CLIENT } from './nats.constants';
import { natsFactory } from './nats.factory';

@Module({
  imports: [ApiConfigModule],
  providers: [
    {
      provide: NATS_CLIENT,
      useFactory: natsFactory,
    },
  ],
})
export class NatsModule {}
