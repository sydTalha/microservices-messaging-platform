import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    Logger.debug('hello');
    return 'Hello!';
  }
}
