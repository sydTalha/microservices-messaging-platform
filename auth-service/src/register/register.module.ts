import { Module } from '@nestjs/common';
import { RegisterController } from './controller/register.controller';
import { RegisterService } from './service/register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [MongooseModule],
})
export class RegisterModule {}
