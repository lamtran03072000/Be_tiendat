import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Module({
  controllers: [BannerController],
  providers: [BannerService, TranslationTextService],
})
export class BannerModule {}
