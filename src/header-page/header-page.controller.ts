import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeaderPageService } from './header-page.service';
import { CreateHeaderPageDto } from './dto/create-header-page.dto';
import { UpdateHeaderPageDto } from './dto/update-header-page.dto';

@Controller('header-page')
export class HeaderPageController {
  constructor(private readonly headerPageService: HeaderPageService) {}

  @Post()
  create(@Body() createHeaderPageDto: CreateHeaderPageDto) {
    return this.headerPageService.create(createHeaderPageDto);
  }

  @Get()
  findAll() {
    return this.headerPageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headerPageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeaderPageDto: UpdateHeaderPageDto) {
    return this.headerPageService.update(+id, updateHeaderPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headerPageService.remove(+id);
  }
}
