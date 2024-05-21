import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { LienHeService } from './lien-he.service';

@Controller('lien-he')
export class LienHeController {
  constructor(private readonly lienHeService: LienHeService) {}
  @Put('banner')
  updateBanner(@Body() data, @Query('lg') lg) {
    return this.lienHeService.updateBanner(data, lg);
  }
  @Put('lien-he')
  updateLienHe(@Body() data) {
    return this.lienHeService.updateLienHe(data);
  }

  @Put('chinh-sach')
  updateChinhSach(@Body() data, @Query('lg') lg) {
    return this.lienHeService.updateChinhSach(data, lg);
  }

  @Put('zalo')
  updateZalo(@Query('sdt') sdt) {
    return this.lienHeService.updateZalo(sdt);
  }
}
