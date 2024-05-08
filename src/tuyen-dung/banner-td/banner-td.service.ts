import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TranslationTextService } from 'src/translation-text/translation-text.service';
@Injectable()
export class BannerTdService {
  constructor(private readonly translationService: TranslationTextService) {}

  async updateContentBannerTdVn(content) {
    const prisma = new PrismaClient();
    const dataHomePageVn: any = await prisma.tuyenDung.update({
      where: {
        id: 1,
      },
      data: {
        banner: content.dataBannerTdVn,
      },
    });
    const dataHomePageEn: any = await prisma.homepage.update({
      where: {
        id: 2,
      },
      data: {
        banner: content.dataBannerTdEn,
      },
    });

    return 'thành công update ';
  }
  async updateContentBannerTdEn(content) {
    const prisma = new PrismaClient();
    const dataHomePageEn: any = await prisma.tuyenDung.update({
      where: {
        id: 2,
      },
      data: {
        banner: content.dataBannerTdEn,
      },
    });
    return 'thành công update banner tiếng anh';
  }
  async updateContentBannerTdFull(content) {
    try {
      const prisma = new PrismaClient();
      const dataHomePageVn: any = await prisma.tuyenDung.update({
        where: {
          id: 1,
        },
        data: {
          banner: content.dataBannerTdVn,
        },
      });

      const dataEn = await this.translationService.translateWithProxies(
        content.dataBannerTdVn,
        'en',
      );

      const dataHomePageEn: any = await prisma.tuyenDung.update({
        where: {
          id: 2,
        },
        data: {
          banner: dataEn,
        },
      });

      return 'thành công update banner tiếng anh và tiếng việt';
    } catch (error) {
      if (error.message == 'All proxies failed') {
        return 'Dịch thất bại';
      }
    }
  }

  async updateContentBannerTd(infoUpdate: any, lg) {
    const prisma = new PrismaClient();
    let status = '';

    if (lg == 'vn') {
      status = await this.updateContentBannerTdVn(infoUpdate.content);
    } else if (lg == 'en') {
      status = await this.updateContentBannerTdEn(infoUpdate.content);
    } else if (lg == 'full') {
      status = await this.updateContentBannerTdFull(infoUpdate.content);
    }

    return status;
  }
}
