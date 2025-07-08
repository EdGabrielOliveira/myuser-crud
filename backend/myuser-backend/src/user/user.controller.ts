import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const avatarUploadConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = './uploads';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (
      _req: Express.Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + extname(file.originalname));
    },
  }),
};

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private formatUserResponse(user: { avatar?: string; [key: string]: any }) {
    return {
      ...user,
      avatar: user.avatar ? `http://localhost:3001${user.avatar}` : null,
    };
  }

  private processAvatarPath(avatar?: Express.Multer.File): string {
    return avatar ? `/uploads/${avatar.filename}` : '';
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar', avatarUploadConfig))
  async create(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() body: CreateUserDto,
  ) {
    const userData = {
      ...body,
      avatar: this.processAvatarPath(avatar),
    };

    const createdUser = await this.userService.create(userData);
    return this.formatUserResponse(createdUser);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar', avatarUploadConfig))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    const data = { ...updateUserDto } as UpdateUserDto & { avatar?: string };

    if (avatar) {
      data.avatar = this.processAvatarPath(avatar);
    }

    if (data.age && typeof data.age === 'string') {
      data.age = new Date(data.age);
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('Nenhum dado para atualizar');
    }

    const updatedUser = await this.userService.update(id, data);
    return this.formatUserResponse(updatedUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
