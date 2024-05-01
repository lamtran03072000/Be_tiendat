import { Module } from '@nestjs/common';
import { LoiMoDauService } from './loi-mo-dau.service';
import { LoiMoDauController } from './loi-mo-dau.controller';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Module({
  controllers: [LoiMoDauController],
  providers: [LoiMoDauService, TranslationTextService],
})
export class LoiMoDauModule {}
