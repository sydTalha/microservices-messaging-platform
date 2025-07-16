import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyService } from 'src/client/client-proxy.service';
import { ProfileDTO } from '../infrastructure/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class ProfileController {
  private readonly client: ClientProxy;
  constructor(private readonly clientProxyService: ClientProxyService) {
    this.client = this.clientProxyService.getProfileClient();
  }

  @Post('createProfile')
  @UseInterceptors(FileInterceptor('file'))
  async createProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() profileD: ProfileDTO,
  ) {
    
  }

  //   @Get('getProfile')
  //   async getProfile(){

  //   }

  //   @Put('updateProfile')
  //   async updateProfile(@Body profileD: ProfileDTO){

  //   }
}
