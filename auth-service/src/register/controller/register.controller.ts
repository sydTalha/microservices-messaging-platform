import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDTO } from '../infrastructure/register.dto';
import { RegisterService } from '../service/register.service';
import { SuccessResponse } from 'src/shared/response/response';

@Controller()
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @MessagePattern('auth_register')
  async register(@Payload() registerDto: RegisterDTO) {
    const response = await this.registerService.handleRegister(registerDto);
    return response;
  }
}
