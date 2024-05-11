import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PageAboutModule } from './page-about/page-about.module';
import { PageHomeModule } from './page-home/page-home.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HeaderPageModule } from './header-page/header-page.module';
import { MailerModule } from './mailer/mailer.module';
import { RouterModule } from '@nestjs/core';
import { BannerModule } from './page-home/banner/banner.module';
import { ImgUploadModule } from './img-upload/img-upload.module';
import { LoiMoDauModule } from './page-home/loi-mo-dau/loi-mo-dau.module';
import { TranslationTextModule } from './translation-text/translation-text.module';
import { BannerTdModule } from './tuyen-dung/banner-td/banner-td.module';
import { TaiSaoLamViecModule } from './tuyen-dung/tai-sao-lam-viec/tai-sao-lam-viec.module';
import { CacViTriModule } from './tuyen-dung/cac-vi-tri/cac-vi-tri.module';
import { SanPhamModule } from './san-pham/san-pham.module';

@Module({
  imports: [
    PageAboutModule,
    PageHomeModule,
    BannerModule,
    BannerTdModule,
    TaiSaoLamViecModule,
    CacViTriModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'img-tiendat'), // đường dẫn tới thư mục chứa tệp tĩnh
      serveRoot: '/img-tiendat', // tiền tố URL cho tệp tĩnh
    }),
    HeaderPageModule,
    MailerModule,
    RouterModule.register([
      {
        path: '',
        module: PageHomeModule,
        children: [
          {
            path: 'page-home',
            module: BannerModule,
          },
          {
            path: 'page-home',
            module: LoiMoDauModule,
          },
        ],
      },
      {
        path: '',
        children: [
          {
            path: 'tuyen-dung',
            module: BannerTdModule,
          },
          {
            path: 'tuyen-dung',
            module: TaiSaoLamViecModule,
          },
          {
            path: 'tuyen-dung',
            module: CacViTriModule,
          },
        ],
      },
    ]),
    ImgUploadModule,
    TranslationTextModule,
    SanPhamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
