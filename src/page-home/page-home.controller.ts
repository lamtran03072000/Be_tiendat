import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PageHomeService } from './page-home.service';
import { CreatePageHomeDto } from './dto/create-page-home.dto';
import { UpdatePageHomeDto } from './dto/update-page-home.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('page-home')
export class PageHomeController {
  constructor(private readonly pageHomeService: PageHomeService) {}

  @Post('/upload-img')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img/home-page',
        filename: (req, file, cb) =>
          cb(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  uploadImg(
    @UploadedFile() file: Express.Multer.File,
    @Query('secion') secion: string,
    @Query('lg') lg: string,
  ) {
    //  xoá hình
    // fs.unlinkSync(process.cwd() + '/public/img/' + file.filename);),
    //   (err) => {
    //     console.log(err);
    //   };

    if (secion === 'banner') {
      this.pageHomeService.upLoadImgBanner(lg, file.filename);
    }
    return 'thành công';
  }

  @Get()
  findAll(@Query('lg') lg: string) {
    return this.pageHomeService.findAll(lg);
  }
}
