import { Injectable } from '@nestjs/common';

@Injectable()
export class PageAboutService {
  findAll() {
    return `This action returns all pageAbout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pageAbout`;
  }

  remove(id: number) {
    return `This action removes a #${id} pageAbout`;
  }
}
