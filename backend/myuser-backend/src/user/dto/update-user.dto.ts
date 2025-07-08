import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'ID do usuário' })
  fullname?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: 'Nome completo' })
  age?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Data de nascimento' })
  street?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Estado' })
  state?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Cidade' })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Bairro' })
  neighborhood?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Biografia' })
  bio?: string;
}
