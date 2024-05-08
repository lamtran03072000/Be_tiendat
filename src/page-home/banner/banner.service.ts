import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { translate } from '@vitalets/google-translate-api';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Injectable()
export class BannerService {
  constructor(private readonly translationService: TranslationTextService) {}

  async updateContentBannerVn(content) {
    const prisma = new PrismaClient();
    const dataHomePageVn: any = await prisma.homepage.update({
      where: {
        id: 1,
      },
      data: {
        banner: content.dataBannerVn,
      },
    });
    const dataHomePageEn: any = await prisma.homepage.update({
      where: {
        id: 2,
      },
      data: {
        banner: content.dataBannerEn,
      },
    });

    return 'thành công update ';
  }
  async updateContentBannerEn(content) {
    const prisma = new PrismaClient();
    const dataHomePageEn: any = await prisma.homepage.update({
      where: {
        id: 2,
      },
      data: {
        banner: content.dataBannerEn,
      },
    });
    return 'thành công update banner tiếng anh';
  }
  async updateContentBannerFull(content) {
    const prisma = new PrismaClient();
    const dataHomePageVn: any = await prisma.homepage.update({
      where: {
        id: 1,
      },
      data: {
        banner: content.dataBannerVn,
      },
    });

    const dataEn = await this.translationService.translateWithProxies(
      content.dataBannerVn,
      'en',
    );

    const dataHomePageEn: any = await prisma.homepage.update({
      where: {
        id: 2,
      },
      data: {
        banner: dataEn,
      },
    });
    return 'thành công update banner tiếng anh và tiếng việt';
  }

  async updateContentBanner2(infoUpdate: any, lg) {
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
}
