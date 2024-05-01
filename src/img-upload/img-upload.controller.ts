import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
  Get,
} from '@nestjs/common';
import { ImgUploadService } from './img-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('img-upload')
export class ImgUploadController {
  constructor(private readonly imgUploadService: ImgUploadService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/../img-tiendat',
        filename: (req, file, cb) => {
          cb(null, new Date().getTime() + '_' + file.originalname);
        },
      }),
    }),
  )
  async updateImg(
    @UploadedFile() file: Express.Multer.File,
    @Query('idImg') idPreImg,
  ) {
    return this.imgUploadService.updateImg(file, idPreImg);
  }

  @Get()
  async getLinkUrl(@Query('idImg') idImg) {
    return this.imgUploadService.getLinkUrl(idImg);
  }
}
