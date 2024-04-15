import { Module } from '@nestjs/common';
import { PageAboutService } from './page-about.service';
import { PageAboutController } from './page-about.controller';

@Module({
  controllers: [PageAboutController],
  providers: [PageAboutService],
})
export class PageAboutModule {}
