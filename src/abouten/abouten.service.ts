import { Injectable } from '@nestjs/common';
import { CreateAboutenDto } from './dto/create-abouten.dto';
import { UpdateAboutenDto } from './dto/update-abouten.dto';
import { PrismaClient } from '@prisma/client';
import { formatResponse } from '../common/helpers/response.helpers';

@Injectable()
export class AboutenService {
  create(createAboutenDto: CreateAboutenDto) {
    return 'This action adds a new abouten';
  }

  async findAll() {
    const prisma = new PrismaClient();
    const content = await prisma.aboutEn.findUnique({
      where: {
        ID: 1,
      },
    });
    return formatResponse(content);
  }

  findOne(id: number) {
    return `This action returns a #${id} abouten`;
  }

  update(id: number, updateAboutenDto: UpdateAboutenDto) {
    return `This action updates a #${id} abouten`;
  }

  remove(id: number) {
    return `This action removes a #${id} abouten`;
  }
}
