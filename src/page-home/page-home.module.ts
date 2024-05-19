import { Module } from '@nestjs/common';
import { PageHomeService } from './page-home.service';
import { PageHomeController } from './page-home.controller';
import { BannerModule } from './banner/banner.module';
import { LoiMoDauModule } from './loi-mo-dau/loi-mo-dau.module';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Module({
  controllers: [PageHomeController],
  providers: [PageHomeService, TranslationTextService],
  imports: [BannerModule, LoiMoDauModule],
})
export class PageHomeModule {}
