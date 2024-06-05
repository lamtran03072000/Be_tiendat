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
import { SanPhamService } from './san-pham.service';

@Controller('san-pham')
export class SanPhamController {
  constructor(private readonly sanPhamService: SanPhamService) {}

  @Post()
  createDssp(@Body() data) {
    return this.sanPhamService.createDssp(data);
  }

  @Delete()
  deleteDssp(@Query('id') id) {
    return this.sanPhamService.deleteDssp(id);
  }

  @Get()
  getDssp(@Query('idDssp') idDssp) {
    return this.sanPhamService.getDssp(idDssp);
  }

  @Put()
  updateDssp(@Query('idDssp') idDssp, @Query('lg') lg, @Body() dataUpdate) {
    return this.sanPhamService.updateDssp(lg, dataUpdate, idDssp);
  }

  @Delete('sp')
  deleteSp(@Query('id') id) {
    return this.sanPhamService.deleteSp(id);
  }

  @Post('sp')
  postSp(@Query('idDssp') idDssp, @Body() dataSp) {
    return this.sanPhamService.postSp(idDssp, dataSp);
  }

  @Get('sp')
  getSp(@Query('idSp') idSp) {
    return this.sanPhamService.getSp(idSp);
  }

  @Put('sp')
  updateSp(@Query('idSp') idSp, @Query('lg') lg, @Body() dataSp) {
    return this.sanPhamService.updateSp(idSp, lg, dataSp);
  }

  @Put('banner')
  updateBanner(@Body() data, @Query('lg') lg) {
    return this.sanPhamService.updateBanner(data, lg);
  }
}
