import { Controller, Body, Put } from '@nestjs/common';
import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Put('/content')
  updateContentBanner(@Body() content) {
    return this.bannerService.updateContentBanner(content);
  }
}
