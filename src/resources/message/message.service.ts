import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor() {}

  processIncomingMessage(message: string) {
    console.log('message', message);
  }
}
