import { Module } from '@nestjs/common';
import { GiaTriService } from './gia-tri.service';
import { GiaTriController } from './gia-tri.controller';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Module({
  controllers: [GiaTriController],
  providers: [GiaTriService, TranslationTextService],
})
export class GiaTriModule {}
