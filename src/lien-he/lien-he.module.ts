import { Module } from '@nestjs/common';
import { LienHeService } from './lien-he.service';
import { LienHeController } from './lien-he.controller';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Module({
  controllers: [LienHeController],
  providers: [LienHeService, TranslationTextService],
})
export class LienHeModule {}
