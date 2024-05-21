import { Module } from '@nestjs/common';
import { PageAboutService } from './page-about.service';
import { PageAboutController } from './page-about.controller';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Module({
  controllers: [PageAboutController],
  providers: [PageAboutService, TranslationTextService],
})
export class PageAboutModule {}
