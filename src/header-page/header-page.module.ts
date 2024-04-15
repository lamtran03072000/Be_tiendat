import { Module } from '@nestjs/common';
import { HeaderPageService } from './header-page.service';
import { HeaderPageController } from './header-page.controller';

@Module({
  controllers: [HeaderPageController],
  providers: [HeaderPageService],
})
export class HeaderPageModule {}
