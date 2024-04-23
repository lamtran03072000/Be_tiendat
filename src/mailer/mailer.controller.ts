import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
  Query,
} from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get()
  findAll() {
    return this.mailerService.findAll();
  }

  @Post('/formLienHe')
  postMailLienHe(@Body() formLienHe) {
    return this.mailerService.postMailLienHe(formLienHe);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailerService.findOne(+id);
  }

  @Delete('/delete-mail')
  remove(@Query('id') id: string) {
    return this.mailerService.remove(+id);
  }
  @Put('/checkMail')
  updateIsCheck(@Query('id') id: string) {
    return this.mailerService.updateIsCheck(+id);
  }
}
