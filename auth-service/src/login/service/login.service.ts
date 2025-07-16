import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../infrastructure/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { FailureResponse, SuccessResponse } from 'src/shared/response/response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async handleLogin(
    loginDto: LoginDTO,
  ): Promise<SuccessResponse | FailureResponse> {
    //fetch user data from DB
    const query = this.userModel.findOne({
      email: `${loginDto.email}`,
    });
    const user = await query.exec();
    Logger.debug(user);
    if (user === null) {
      return new FailureResponse(false, 'incorrect credentials');
    }
    //compare password
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      return new FailureResponse(false, 'incorrect credentials');
    }
    //TODO: optional - check if user has verified his email
    //..

    const payload = { sub: user.id as string, username: user.email };
    const { password, ...otherProps } = user.toObject();

    const token = await this.jwtService.signAsync(payload);
    return new SuccessResponse(true, 'logged in', {
      token: token,
      user: otherProps,
    });
  }
}
