import { Injectable } from '@nestjs/common';
import { CreateHeaderPageDto } from './dto/create-header-page.dto';
import { UpdateHeaderPageDto } from './dto/update-header-page.dto';

@Injectable()
export class HeaderPageService {
  create(createHeaderPageDto: CreateHeaderPageDto) {
    return 'This action adds a new headerPage';
  }

  findAll() {
    return `This action returns all headerPage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} headerPage`;
  }

  update(id: number, updateHeaderPageDto: UpdateHeaderPageDto) {
    return `This action updates a #${id} headerPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} headerPage`;
  }
}
