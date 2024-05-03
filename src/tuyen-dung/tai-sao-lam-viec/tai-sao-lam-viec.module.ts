import { Module } from '@nestjs/common';
import { TaiSaoLamViecService } from './tai-sao-lam-viec.service';
import { TaiSaoLamViecController } from './tai-sao-lam-viec.controller';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Module({
  controllers: [TaiSaoLamViecController],
  providers: [TaiSaoLamViecService, TranslationTextService],
})
export class TaiSaoLamViecModule {}
