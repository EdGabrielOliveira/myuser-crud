import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: CreateUserDto & { avatar?: string }) {
    const user = await this.prisma.user.create({
      data: {
        fullname: userData.fullname,
        age: new Date(userData.age),
        state: userData.state,
        street: userData.street,
        city: userData.city,
        neighborhood: userData.neighborhood,
        bio: userData.bio,
        avatar: userData.avatar || '',
      },
    });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id?: string) {
    return this.prisma.user.findMany({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
