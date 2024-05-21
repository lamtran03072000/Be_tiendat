import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/content')
  getContent(@Query('lg') lg: string) {
    return this.appService.getContent(lg);
  }

  @Get('/content-full')
  getContentFull() {
    return this.appService.getContentFull();
  }

  @Post('/login')
  postLogin(@Body() user) {
    return this.appService.login(user);
  }
}
