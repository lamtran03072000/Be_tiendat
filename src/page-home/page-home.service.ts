import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PageHomeService {
  async findAll(lg) {
    let idLanguage = 1;
    if (lg == 'en') {
      idLanguage = 2;
    }
    const prisma = new PrismaClient();
    const data = await prisma.homepage.findUnique({
      where: {
        id: idLanguage,
      },
    });

    return data;
  }
  async upLoadImgBanner(lg, fileName) {
    let imgUrl = `http://localhost:8000/public/img/home-page/${fileName}`;
    let idLanguage = 1;
    if (lg == 'en') {
      idLanguage = 2;
    }
    const prisma = new PrismaClient();

    const data = await prisma.homepage.findUnique({
      where: {
        id: idLanguage,
      },
    });
    let dataBanner: {} = data.banner;
    let newDataBanner = { ...dataBanner, img: imgUrl };
    await prisma.homepage.update({
      where: {
        id: idLanguage,
      },
      data: {
        banner: newDataBanner,
      },
    });

    return '';
  }
}
