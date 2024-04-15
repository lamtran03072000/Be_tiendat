import { Injectable } from '@nestjs/common';
import { CreateAboutvnDto } from './dto/create-aboutvn.dto';
import { UpdateAboutvnDto } from './dto/update-aboutvn.dto';
import { formatResponse } from 'src/common/helpers/response.helpers';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AboutvnService {
  create(createAboutvnDto: CreateAboutvnDto) {
    return 'This action adds a new aboutvn';
  }
  async findAll() {
    const prisma = new PrismaClient();
    const content = await prisma.aboutVn.findUnique({
      where: {
        ID: 1,
      },
    });
    return formatResponse(content);
  }

  async updateContentl(data) {
    const { idSection, contentSection } = data;
    const prisma = new PrismaClient();
    const content = await prisma.aboutVn.update({
      where: {
        ID: 1,
      },
      data: {
        [idSection]: contentSection,
      },
    });
    return formatResponse(content);
  }
}
