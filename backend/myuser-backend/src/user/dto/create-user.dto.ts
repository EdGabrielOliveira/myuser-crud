import { IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'ID do usuário' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Nome completo' })
  @IsString()
  fullname: string;

  @ApiProperty({ description: 'Data de nascimento' })
  @IsDate()
  age: Date;

  @ApiProperty({ description: 'Estado' })
  @IsString()
  state: string;

  @ApiProperty({ description: 'Rua' })
  @IsString()
  street: string;

  @ApiProperty({ description: 'Cidade' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Bairro' })
  @IsString()
  neighborhood: string;

  @ApiProperty({ description: 'Biografia' })
  @IsString()
  bio: string;
}
