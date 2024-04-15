import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AboutvnService } from './aboutvn.service';
import { CreateAboutvnDto } from './dto/create-aboutvn.dto';
import { UpdateAboutvnDto } from './dto/update-aboutvn.dto';

@Controller('aboutvn')
export class AboutvnController {
  constructor(private readonly aboutvnService: AboutvnService) {}

  @Get('/content')
  findAll() {
    return this.aboutvnService.findAll();
  }
  @Put('/content')
  updateContent(@Body() data) {
    return this.aboutvnService.updateContentl(data);
  }
}
