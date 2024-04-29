import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: FileUploadService,
    }),
  ],
  providers: [FileUploadService],
})
export class FileUploadModule {}
