import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { RegisterDTO } from '../infrastructure/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { FailureResponse, SuccessResponse } from 'src/shared/response/response';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async handleRegister(userData: RegisterDTO) {
    const pswd = await this.hashPassword(userData.password);
    const user = new User();
    user.email = userData.email;
    user.password = pswd;

    try {
      await this.userModel.create(user);
      return new SuccessResponse(true, 'user registered');
    } catch (error) {
      Logger.error(error);
      return new FailureResponse(false, 'error while creating user');
    }

    //TODO: send verification email
    //..
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
