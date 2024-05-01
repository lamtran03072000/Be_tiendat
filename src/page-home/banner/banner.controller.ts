import { Controller, Body, Put, Query } from '@nestjs/common';
import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Put('/content2')
  updateContentBanner2(@Body() infoUpdate, @Query('lg') lg) {
    return this.bannerService.updateContentBanner2(infoUpdate, lg);
  }
}
