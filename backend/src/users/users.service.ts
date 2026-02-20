/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: any) {
    const hash = await bcrypt.hash(dto.clave, 10);

    const user = this.userRepository.create({
      nombre: dto.nombre,
      email: dto.email,
      password: hash,
      role: dto.role,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('usuario no existe');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
