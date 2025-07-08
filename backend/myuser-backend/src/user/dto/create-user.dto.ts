import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'ID do usuário' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Nome completo' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({ description: 'Data de nascimento' })
  @IsNotEmpty()
  @IsDate()
  age: Date;

  @ApiProperty({ description: 'Estado' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'Rua' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ description: 'Cidade' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'Bairro' })
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @ApiProperty({ description: 'Biografia' })
  @IsNotEmpty()
  @IsString()
  bio: string;
}
