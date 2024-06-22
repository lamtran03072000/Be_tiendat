import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
  Get,
  UploadedFiles,
} from '@nestjs/common';
import { ImgUploadService } from './img-upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

// const dirmk = process.cwd() + '/../img-tiendat';
const dirmk = '/usr/tiendat_be/img-tiendat';

@Controller('img-upload')
export class ImgUploadController {
  constructor(private readonly imgUploadService: ImgUploadService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: dirmk,
        // destination: '/usr/tiendat_be/img-tiendat',
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

  @Post('check')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      // 'files' là tên field, 10 là số lượng file tối đa
      storage: diskStorage({
        destination: dirmk,
        // destination: '/usr/tiendat_be/img-tiendat',
        filename: (req, file, cb) => {
          cb(null, new Date().getTime() + '_' + file.originalname);
        },
      }),
    }),
  )
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files); // Bạn có thể xử lý files ở đây
    return { message: 'Files uploaded successfully!', files };
  }

  @Post('video-banner')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: dirmk,
        // destination: '/usr/tiendat_be/img-tiendat',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}_${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type, only video is allowed!'), false);
        }
      },
    }),
  )
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Query('urlPre') urlPre,
  ) {
    return this.imgUploadService.updateVideos(file, urlPre);
  }
}
