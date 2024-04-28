import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HeaderPageService } from './header-page.service';

@Controller('header-page')
export class HeaderPageController {
  constructor(private readonly headerPageService: HeaderPageService) {}

  @Post()
  @Get()
  findAll() {
    return this.headerPageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headerPageService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headerPageService.remove(+id);
  }
}
