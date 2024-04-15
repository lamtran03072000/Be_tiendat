import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PageAboutService } from './page-about.service';
import { CreatePageAboutDto } from './dto/create-page-about.dto';
import { UpdatePageAboutDto } from './dto/update-page-about.dto';

@Controller('page-about')
export class PageAboutController {
  constructor(private readonly pageAboutService: PageAboutService) {}

  @Post()
  create(@Body() createPageAboutDto: CreatePageAboutDto) {
    return this.pageAboutService.create(createPageAboutDto);
  }

  @Get()
  findAll() {
    return this.pageAboutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageAboutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageAboutDto: UpdatePageAboutDto) {
    return this.pageAboutService.update(+id, updatePageAboutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageAboutService.remove(+id);
  }
}
