import { Module } from '@nestjs/common';
import { CacViTriService } from './cac-vi-tri.service';
import { CacViTriController } from './cac-vi-tri.controller';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Module({
  controllers: [CacViTriController],
  providers: [CacViTriService, TranslationTextService],
})
export class CacViTriModule {}
