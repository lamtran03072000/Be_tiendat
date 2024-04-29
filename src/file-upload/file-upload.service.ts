import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';

// import * as multer from 'multer';
import multer, { diskStorage } from 'multer';

@Injectable()
export class FileUploadService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    console.log(`Current working directory: ${process.cwd()}`);

    return {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, cb) => {
          const data = cb(null, new Date().getTime() + '_' + file.originalname);
          return data;
        },
      }),
    };
  }
}
