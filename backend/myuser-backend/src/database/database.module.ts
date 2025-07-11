import { Global, Module } from '@nestjs/common';

import { PrismaService } from './database.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
