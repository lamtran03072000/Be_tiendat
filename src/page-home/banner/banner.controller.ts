import {
  Controller,
  Body,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import multer, { diskStorage } from 'multer';

@Controller('banner')
export class BannerController {
  constructor(
    private readonly bannerService: BannerService,
    private fileUploadService: FileUploadService,
  ) {}

  @Put('/content')
  updateContentBanner(@Body() infoUpdate, @Query('lg') lg) {
    return this.bannerService.updateContentBanner(infoUpdate, lg);
  }

  @Post('/img')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, cb) => {
          const data = cb(null, new Date().getTime() + '_' + file.originalname);
          return data;
        },
      }),
    }),
  )
  async updateImgBanner(@UploadedFile() file: Express.Multer.File) {
    return this.bannerService.updateImgBanner(file);
  }
}
