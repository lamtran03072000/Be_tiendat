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
import { CacViTriService } from './cac-vi-tri.service';

@Controller('cac-vi-tri')
export class CacViTriController {
  constructor(private readonly cacViTriService: CacViTriService) {}
  @Post('')
  postViTri(@Body() infoViTri) {
    return this.cacViTriService.postViTri(infoViTri);
  }
  @Delete('')
  deleteViTri(@Query('id') id) {
    return this.cacViTriService.deleteViTri(id);
  }

  @Post('change-vi-tri')
  updateViTri(@Body() infoViTri) {
    return this.cacViTriService.updateViTri(infoViTri);
  }

  @Put('content')
  updateContentViTri(
    @Body() infoViTri,
    @Query('lg') lg,
    @Query('id') idUpdate,
  ) {
    return this.cacViTriService.updateContent(infoViTri, lg, idUpdate);
  }
}
