import { Module } from '@nestjs/common';
import { BannerTdService } from './banner-td.service';
import { BannerTdController } from './banner-td.controller';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Module({
  controllers: [BannerTdController],
  providers: [BannerTdService, TranslationTextService],
})
export class BannerTdModule {}
