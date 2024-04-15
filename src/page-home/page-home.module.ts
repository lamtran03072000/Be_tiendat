import { Module } from '@nestjs/common';
import { PageHomeService } from './page-home.service';
import { PageHomeController } from './page-home.controller';

@Module({
  controllers: [PageHomeController],
  providers: [PageHomeService],
})
export class PageHomeModule {}
