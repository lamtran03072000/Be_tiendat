import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Injectable()
export class LoiMoDauService {
  constructor(private readonly translationService: TranslationTextService) {} // Inject TranslationService

  async updateContentLMDVn(content) {
    const prisma = new PrismaClient();
    const dataHomePageVn: any = await prisma.homepage.update({
      where: {
        id: 1,
      },
      data: {
        loiMoDau: content.dataLoiMoDauVn,
      },
    });
    const dataHomePageEn: any = await prisma.homepage.update({
      where: {
        id: 2,
      },
      data: {
        loiMoDau: content.dataLoiMoDauEn,
      },
    });

    return 'thành công update ';
  }
  async updateContentLMDEn(content) {
    const prisma = new PrismaClient();
    const dataHomePageEn: any = await prisma.homepage.update({
      where: {
        id: 2,
      },
      data: {
        loiMoDau: content.dataLoiMoDauEn,
      },
    });
    return 'thành công update banner tiếng anh';
  }
  async updateContentLMDFull(content) {
    try {
      const prisma = new PrismaClient();
      const dataHomePageVn: any = await prisma.homepage.update({
        where: {
          id: 1,
        },
        data: {
          loiMoDau: content.dataLoiMoDauVn,
        },
      });
      const dataEn = await this.translationService.translateWithProxies(
        content.dataLoiMoDauVn,
        'en',
      );
      const dataHomePageEn: any = await prisma.homepage.update({
        where: {
          id: 2,
        },
        data: {
          loiMoDau: dataEn,
        },
      });

      return 'thành công update banner tiếng anh và tiếng việt';
    } catch (error) {
      console.log('error: ', error);
      if (error.message == 'All proxies failed') {
        return 'Dịch thất bại';
      }
    }
  }

  async updateContentLMD(infoUpdate: any, lg) {
    const prisma = new PrismaClient();
    let status = '';

    if (lg == 'vn') {
      status = await this.updateContentLMDVn(infoUpdate.content);
    } else if (lg == 'en') {
      status = await this.updateContentLMDEn(infoUpdate.content);
    } else if (lg == 'full') {
      status = await this.updateContentLMDFull(infoUpdate.content);
    }

    return status;
  }
}
