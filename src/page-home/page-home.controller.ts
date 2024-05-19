import { Controller, Query, Put, Body, Post, Delete } from '@nestjs/common';
import { PageHomeService } from './page-home.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('page-home')
export class PageHomeController {
  constructor(private readonly pageHomeService: PageHomeService) {}

  @Put('/number')
  updateNumber(@Body() dataNumber, @Query('lg') lg) {
    return this.pageHomeService.updateNumber(lg, dataNumber);
  }
  @Put('/linh-vuc-ung-dung')
  updateLVUD(@Body() dataLVUD, @Query('lg') lg) {
    return this.pageHomeService.updateLVUD(lg, dataLVUD);
  }

  @Post('/thu-vien-hinh-anh')
  createTVHA(@Query('idImg') idImg) {
    return this.pageHomeService.createTVHA(idImg);
  }

  @Delete('/thu-vien-hinh-anh')
  deleteTVHA(@Query('idImg') idImg) {
    return this.pageHomeService.deleteTVHA(idImg);
  }
}
