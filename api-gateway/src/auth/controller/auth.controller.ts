/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyService } from 'src/client/client-proxy.service';
import { LoginDTO } from '../infrastructure/login.dto';
import { RegisterDTO } from '../infrastructure/register.dto';
import { lastValueFrom } from 'rxjs';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller()
export class AuthController {
  private readonly client: ClientProxy;

  constructor(private readonly clientProxyService: ClientProxyService) {
    this.client = this.clientProxyService.getAuthClient();
  }

  @Post('login')
  async login(@Body() credentials: LoginDTO) {
    const response$ = this.client.send('auth_login', credentials);
    const resp = await lastValueFrom(response$);
    if (resp.success) {
      return lastValueFrom(response$);
    }
    throw new HttpException('incorrect credentials', HttpStatus.UNAUTHORIZED);
  }

  @Post('register')
  async register(@Body() userData: RegisterDTO) {
    const response$ = this.client.send('auth_register', userData);
    const resp = await lastValueFrom(response$);
    if (resp.success) {
      return resp;
    }
    throw new HttpException(resp.message as string, HttpStatus.BAD_REQUEST);
  }

  @Get()
  @UseGuards(AuthGuard)
  check(@Request() req) {
    Logger.debug(req.user.sub);
    return 'hello';
  }
}
