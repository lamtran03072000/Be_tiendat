import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PageAboutModule } from './page-about/page-about.module';
import { PageHomeModule } from './page-home/page-home.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HeaderPageModule } from './header-page/header-page.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    PageAboutModule,
    PageHomeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // đường dẫn tới thư mục chứa tệp tĩnh
      serveRoot: '/public/', // tiền tố URL cho tệp tĩnh
    }),
    HeaderPageModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
