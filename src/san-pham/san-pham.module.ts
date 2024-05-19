import { Module } from '@nestjs/common';
import { SanPhamService } from './san-pham.service';
import { SanPhamController } from './san-pham.controller';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Module({
  controllers: [SanPhamController],
  providers: [SanPhamService, TranslationTextService],
})
export class SanPhamModule {}
