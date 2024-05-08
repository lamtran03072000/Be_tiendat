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
}
