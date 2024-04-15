import { Injectable } from '@nestjs/common';
import { CreatePageAboutDto } from './dto/create-page-about.dto';
import { UpdatePageAboutDto } from './dto/update-page-about.dto';

@Injectable()
export class PageAboutService {
  create(createPageAboutDto: CreatePageAboutDto) {
    return 'This action adds a new pageAbout';
  }

  findAll() {
    return `This action returns all pageAbout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pageAbout`;
  }

  update(id: number, updatePageAboutDto: UpdatePageAboutDto) {
    return `This action updates a #${id} pageAbout`;
  }

  remove(id: number) {
    return `This action removes a #${id} pageAbout`;
  }
}
