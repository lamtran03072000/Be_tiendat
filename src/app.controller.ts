import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/content')
  getContent(@Query('lg') lg: string) {
    return this.appService.getContent(lg);
  }

  @Get('/content-full')
  getContentFull() {
    return this.appService.getContentFull();
  }

  @Post('/img')
  @UseInterceptors(FileInterceptor('file'))
  async updateImgBanner(@UploadedFile() file: Express.Multer.File) {
    console.log('file: ', file);
    return '';
  }
}
