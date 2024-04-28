import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BannerService {
  async updateContentBanner(content: any) {
    const prisma = new PrismaClient();

    const dataHomePage: any = await prisma.homepage.findUnique({
      where: {
        id: 1,
      },
    });
    const newDataBanner = { ...dataHomePage.banner };
    const newContent = content.content;
    const data = await prisma.homepage.update({
      where: {
        id: 1,
      },
      data: {
        banner: { ...newDataBanner, content: newContent },
      },
    });
    return `Thành công`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banner`;
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
