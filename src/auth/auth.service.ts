import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './auth.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserCredentials } from 'src/common/user-credentials';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jstService: JwtService,
  ) {}

  async register(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async login(userCredentials: UserCredentials): Promise<any> {
    const user = await this.userModel
      .findOne({ email: userCredentials.email })
      .exec();

    if (
      !user ||
      !(await bcrypt.compare(userCredentials.password, user.password))
    ) {
      throw new UnauthorizedException();
    }

    const token = this.jstService.sign({
      sub: user.id,
      usernmae: user.username,
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}
