import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(createUserDto.email);
    console.log(candidate);
    if (candidate) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 5);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.generateAccessToken(user);
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);
    return this.generateAccessToken(user);
  }

  private generateAccessToken(
    user: User & {
      _id: Types.ObjectId;
    },
  ) {
    const payload = { email: user.email, id: user._id };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async validateUser(createUserDto: CreateUserDto) {
    const user = await this.userService.getByEmail(createUserDto.email);
    const isPasswordEqual = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );
    if (user && isPasswordEqual) {
      return user;
    }
    throw new UnauthorizedException('Неверный пароль');
  }
}
