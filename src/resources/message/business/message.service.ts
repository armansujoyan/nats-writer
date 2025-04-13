import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../data/message.repository';
import { ParsedIncomingMessage } from '../message.types';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepo: MessageRepository) {}

  async processIncomingMessage(message: string) {
    const validatedMessage = this.validateIncomingMessage(message);
    await this.messageRepo.save(validatedMessage);
  }

  validateIncomingMessage(incomingMessage: string): ParsedIncomingMessage {
    let parsed: unknown;
    try {
      parsed = JSON.parse(incomingMessage);
    } catch (error) {
      throw new Error(
        `Failed to parse JSON from message data: ${error.message}`,
      );
    }

    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Parsed message is not an object');
    }

    const { content, timestamp } = parsed as {
      content?: unknown;
      timestamp?: unknown;
    };

    if (typeof content !== 'string' || typeof timestamp !== 'string') {
      throw new Error(
        'Invalid message structure: Expected both "message" and "timestamp" as strings',
      );
    }

    const parsedDate = new Date(timestamp);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(
        `Invalid timestamp: "${timestamp}" is not a valid ISO 8601 string`,
      );
    }

    return { content, timestamp: parsedDate };
  }
}
