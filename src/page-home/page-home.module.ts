import { Module } from '@nestjs/common';
import { PageHomeService } from './page-home.service';
import { PageHomeController } from './page-home.controller';
import { BannerModule } from './banner/banner.module';

@Module({
  controllers: [PageHomeController],
  providers: [PageHomeService],
  imports: [BannerModule],
})
export class PageHomeModule {}
