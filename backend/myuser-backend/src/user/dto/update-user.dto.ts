import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do usuário' })
  fullname?: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome completo' })
  age?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Data de nascimento' })
  street?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Estado' })
  state?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Cidade' })
  city?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Bairro' })
  neighborhood?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Biografia' })
  bio?: string;
}
