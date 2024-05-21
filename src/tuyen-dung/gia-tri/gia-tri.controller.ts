import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { GiaTriService } from './gia-tri.service';

@Controller('gia-tri')
export class GiaTriController {
  constructor(private readonly giaTriService: GiaTriService) {}

  @Put('/content')
  updateGiaTri(@Body() dataLVUD, @Query('lg') lg) {
    return this.giaTriService.updateGiaTri(lg, dataLVUD);
  }
}
