import { Controller, Body, Query, Put } from '@nestjs/common';
import { BannerTdService } from './banner-td.service';

@Controller('banner-td')
export class BannerTdController {
  constructor(private readonly bannerTdService: BannerTdService) {}

  @Put('/content')
  updateContentBanner(@Body() infoUpdate, @Query('lg') lg) {
    return this.bannerTdService.updateContentBannerTd(infoUpdate, lg);
  }
}
