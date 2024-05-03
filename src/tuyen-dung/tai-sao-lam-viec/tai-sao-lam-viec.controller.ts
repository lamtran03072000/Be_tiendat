import { Controller, Body, Put, Query } from '@nestjs/common';
import { TaiSaoLamViecService } from './tai-sao-lam-viec.service';

@Controller('tai-sao-lam-viec')
export class TaiSaoLamViecController {
  constructor(private readonly taiSaoLamViecService: TaiSaoLamViecService) {}
  @Put('/content')
  updateContentBanner(@Body() infoUpdate, @Query('lg') lg) {
    return this.taiSaoLamViecService.updateContentTSLVTd(infoUpdate, lg);
  }
}
