import { Controller, Inject } from '@nestjs/common';
import { NatsConnection, StringCodec } from 'nats';
import { ApiConfigService } from 'src/config/config.service';
import { NATS_CLIENT } from 'src/nats/nats.constants';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(
    @Inject(NATS_CLIENT) private readonly natsClient: NatsConnection,
    private readonly apiConfigService: ApiConfigService,
    private readonly messageService: MessageService,
  ) {}
  onModuleInit() {
    this.subscribeToMessages();
  }

  private async subscribeToMessages() {
    const codec = StringCodec();
    const subscription = this.natsClient.subscribe(
      this.apiConfigService.messageConfig.subject,
    );
    for await (const message of subscription) {
      const decodedMessage = codec.decode(message.data);
      this.messageService.processIncomingMessage(decodedMessage);
    }
  }
}
