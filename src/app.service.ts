import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  async getContent(lg) {
    let idLanguage = 1;
    if (lg == 'en') {
      idLanguage = 2;
    }
    const prisma = new PrismaClient();
    const dataPage = await prisma.homepage.findUnique({
      where: {
        id: idLanguage,
      },
    });

    const dataHeader = await prisma.header.findUnique({
      where: { id: idLanguage },
    });
    return {
      headerPage: dataHeader,
      homePage: dataPage,
    };
  }
}
