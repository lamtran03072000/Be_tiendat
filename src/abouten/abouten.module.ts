import { Module } from '@nestjs/common';
import { AboutenService } from './abouten.service';
import { AboutenController } from './abouten.controller';

@Module({
  controllers: [AboutenController],
  providers: [AboutenService],
})
export class AboutenModule {}
