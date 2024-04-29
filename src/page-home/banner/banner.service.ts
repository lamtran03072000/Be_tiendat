import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { translate } from '@vitalets/google-translate-api';

@Injectable()
export class BannerService {
  constructor() {}

  async updateContentBannerVn(content) {
    const prisma = new PrismaClient();
    const dataHomePage: any = await prisma.homepage.findUnique({
      where: {
        id: 1,
      },
    });
    const newDataBanner = { ...dataHomePage.banner };
    const data = await prisma.homepage.update({
      where: {
        id: 1,
      },
      data: {
        banner: { ...newDataBanner, content },
      },
    });
    return 'thành công update banner tiếng việt';
  }
  async updateContentBannerEn(content) {
    const prisma = new PrismaClient();
    const dataHomePage: any = await prisma.homepage.findUnique({
      where: {
        id: 2,
      },
    });
    const newDataBanner = { ...dataHomePage.banner };
    const data = await prisma.homepage.update({
      where: {
        id: 2,
      },
      data: {
        banner: { ...newDataBanner, content },
      },
    });
    return 'thành công update banner tiếng anh';
  }
  async updateContentBannerFull(content) {
    console.log('content: ', content);
    const prisma = new PrismaClient();
    const dataHomePage: any = await prisma.homepage.findUnique({
      where: {
        id: 1,
      },
    });
    const newDataBanner = { ...dataHomePage.banner };

    const updateDataVn = await prisma.homepage.update({
      where: {
        id: 1,
      },
      data: {
        banner: { ...newDataBanner, content },
      },
    });
    let newContentTranslateVnToEn = await translate(content, { to: 'en' });
    const updateDataEn = await prisma.homepage.update({
      where: {
        id: 2,
      },
      data: {
        banner: { ...newDataBanner, content: newContentTranslateVnToEn.text },
      },
    });
    return 'thành công update banner tiếng anh và tiếng việt';
  }

  async updateContentBanner(infoUpdate: any, lg) {
    const prisma = new PrismaClient();
    let status = '';
    if (lg == 'vn') {
      status = await this.updateContentBannerVn(infoUpdate.content);
    } else if (lg == 'en') {
      status = await this.updateContentBannerEn(infoUpdate.content);
    } else if (lg == 'full') {
      status = await this.updateContentBannerFull(infoUpdate.content);
    }

    return status;
  }

  async updateImgBanner(file) {
    try {
      const prisma = new PrismaClient();

      let urlImg = file.destination + '/' + file.filename;
      let dataHomePage = await prisma.homepage.findUnique({
        where: {
          id: 1,
        },
      });
      let newBanner: {} = dataHomePage.banner;
      let data = await prisma.homepage.update({
        where: {
          id: 1,
        },
        data: {
          banner: { ...newBanner, img: urlImg },
        },
      });
      return 'thành công';
    } catch (error) {}
  }
}
