import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Module({
  controllers: [BannerController],
  providers: [BannerService, FileUploadService],
})
export class BannerModule {}
