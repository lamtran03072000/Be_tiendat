import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TranslationTextService } from './translation-text.service';

@Controller('translation-text')
export class TranslationTextController {
  constructor(
    private readonly translationTextService: TranslationTextService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translationTextService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translationTextService.remove(+id);
  }
}
