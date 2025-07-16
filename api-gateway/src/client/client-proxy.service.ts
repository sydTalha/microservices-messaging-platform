import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxyService {
  private readonly authClient: ClientProxy;
  private readonly profileClient: ClientProxy;
  private readonly chatClient: ClientProxy;

  constructor() {
    this.authClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL ?? 'localhost'],
        queue: 'auth_queue',
        queueOptions: { durable: false },
      },
    });
    this.profileClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL ?? 'localhost'],
        queue: 'profile_queue',
        queueOptions: { durable: false },
      },
    });
    this.chatClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL ?? 'localhost'],
        queue: 'chat_queue',
        queueOptions: { durable: false },
      },
    });
  }

  getAuthClient(): ClientProxy {
    return this.authClient;
  }

  getProfileClient(): ClientProxy {
    return this.profileClient;
  }

  getChatClient(): ClientProxy {
    return this.chatClient;
  }
}
