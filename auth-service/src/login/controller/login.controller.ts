import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDTO } from '../infrastructure/login.dto';
import { LoginService } from '../service/login.service';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @MessagePattern('auth_login')
  login(@Payload() loginDto: LoginDTO) {
    console.log('here');
    Logger.debug(JSON.stringify(loginDto));
    //handle login use case
    const response = this.loginService.handleLogin(loginDto);
    return response;
  }
}
