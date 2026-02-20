/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne(email);

    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  login(user: { email: string; nombre: string; id: string; role: string }) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      message: 'Login exitoso',
      user: {
        id: user.id,
        username: user.nombre,
        email: user.email,
        role: user.role,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  logout(req) {
    req.logout((err: any) => {
      if (err) {
        return { message: 'Error al cerrar sesión', error: err };
      }
    });

    return {
      message: 'Sesión cerrada exitosamente',
      statusCode: 200,
    };
  }
}
