import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutvnModule } from './aboutvn/aboutvn.module';
import { AboutenModule } from './abouten/abouten.module';
import { PageAboutModule } from './page-about/page-about.module';
import { PageHomeModule } from './page-home/page-home.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AboutvnModule,
    AboutenModule,
    PageAboutModule,
    PageHomeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // đường dẫn tới thư mục chứa tệp tĩnh
      serveRoot: '/public/', // tiền tố URL cho tệp tĩnh
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
