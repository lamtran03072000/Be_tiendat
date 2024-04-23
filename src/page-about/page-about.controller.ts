import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PageAboutService } from './page-about.service';

@Controller('page-about')
export class PageAboutController {
  constructor(private readonly pageAboutService: PageAboutService) {}

  @Get()
  findAll() {
    return this.pageAboutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageAboutService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageAboutService.remove(+id);
  }
}
