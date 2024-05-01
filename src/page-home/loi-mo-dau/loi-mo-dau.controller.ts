import {
  Controller,
  Get,
  Param,
  Delete,
  Put,
  Query,
  Body,
} from '@nestjs/common';
import { LoiMoDauService } from './loi-mo-dau.service';

@Controller('loi-mo-dau')
export class LoiMoDauController {
  constructor(private readonly loiMoDauService: LoiMoDauService) {}
  @Put('/content')
  updateContentLMD(@Body() infoUpdate, @Query('lg') lg) {
    return this.loiMoDauService.updateContentLMD(infoUpdate, lg);
  }
}
