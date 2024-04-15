import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AboutenService } from './abouten.service';
import { CreateAboutenDto } from './dto/create-abouten.dto';
import { UpdateAboutenDto } from './dto/update-abouten.dto';

@Controller('abouten')
export class AboutenController {
  constructor(private readonly aboutenService: AboutenService) {}

  @Post()
  create(@Body() createAboutenDto: CreateAboutenDto) {
    return this.aboutenService.create(createAboutenDto);
  }

  @Get('/content')
  findAll() {
    return this.aboutenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutenService.findOne(+id);
  }
}
