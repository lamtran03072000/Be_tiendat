import { Module } from '@nestjs/common';
import { PageHomeService } from './page-home.service';
import { PageHomeController } from './page-home.controller';
import { BannerModule } from './banner/banner.module';
import { LoiMoDauModule } from './loi-mo-dau/loi-mo-dau.module';

@Module({
  controllers: [PageHomeController],
  providers: [PageHomeService],
  imports: [BannerModule, LoiMoDauModule],
})
export class PageHomeModule {}
