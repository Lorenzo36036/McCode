/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userService: UsersService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findOne(email);

    if (user?.password !== pass)
      throw new UnauthorizedException('Usuario o Contrasena invalido');

    const { password, ...result } = user;

    return result;
  }
}
