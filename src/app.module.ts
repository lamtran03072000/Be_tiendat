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

@Module({
  imports: [
    PageAboutModule,
    PageHomeModule,
    BannerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // đường dẫn tới thư mục chứa tệp tĩnh
      serveRoot: '/public/', // tiền tố URL cho tệp tĩnh
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
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
