import { Module } from '@nestjs/common';
import { AboutvnService } from './aboutvn.service';
import { AboutvnController } from './aboutvn.controller';

@Module({
  controllers: [AboutvnController],
  providers: [AboutvnService],
})
export class AboutvnModule {}
