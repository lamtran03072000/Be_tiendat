import { Module } from '@nestjs/common';
import { TranslationTextService } from './translation-text.service';
import { TranslationTextController } from './translation-text.controller';

@Module({
  controllers: [TranslationTextController],
  providers: [TranslationTextService],
})
export class TranslationTextModule {}
