import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { PageAboutService } from './page-about.service';

@Controller('page-about')
export class PageAboutController {
  constructor(private readonly pageAboutService: PageAboutService) {}

  @Put('banner')
  updateBanner(@Body() data, @Query('lg') lg) {
    console.log('yes');
    return this.pageAboutService.updateBanner(data, lg);
  }

  @Put('des')
  updateDes(@Body() data, @Query('lg') lg) {
    return this.pageAboutService.updateDes(lg, data);
  }

  @Put('/core-value')
  updateCoreValue(@Body() data, @Query('lg') lg) {
    return this.pageAboutService.updateCoreValue(lg, data);
  }
}
