import { Injectable } from '@nestjs/common';

@Injectable()
export class HeaderPageService {
  findAll() {
    return `This action returns all headerPage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} headerPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} headerPage`;
  }
}
