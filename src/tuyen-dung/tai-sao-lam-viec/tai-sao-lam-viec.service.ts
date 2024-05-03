import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TranslationTextService } from 'src/translation-text/translation-text.service';
@Injectable()
export class TaiSaoLamViecService {
  constructor(private readonly translationService: TranslationTextService) {}

  async updateContentTSLVTdVn(content) {
    const prisma = new PrismaClient();
    const dataTdVn: any = await prisma.tuyenDung.update({
      where: {
        id: 1,
      },
      data: {
        taiSaoLamViec: content.dataTSLVTdVn,
      },
    });
    const dataTdEn: any = await prisma.tuyenDung.update({
      where: {
        id: 2,
      },
      data: {
        taiSaoLamViec: content.dataTSLVTdEn,
      },
    });

    return 'thành công update ';
  }
  async updateContentTSLVTdEn(content) {
    const prisma = new PrismaClient();
    const dataTdEn: any = await prisma.tuyenDung.update({
      where: {
        id: 2,
      },
      data: {
        taiSaoLamViec: content.dataTSLVTdEn,
      },
    });
    return 'thành công update banner tiếng anh';
  }
  async updateContentTSLVTdFull(content) {
    try {
      const prisma = new PrismaClient();
      const dataTdVn: any = await prisma.tuyenDung.update({
        where: {
          id: 1,
        },
        data: {
          taiSaoLamViec: content.dataTSLVTdVn,
        },
      });
      const dataTSLVTdVnJson = JSON.stringify(content.dataTSLVTdVn);

      const dataEn = await this.translationService.translateWithProxies(
        dataTSLVTdVnJson,
        'en',
      );
      const newDataEn = JSON.parse(dataEn);

      const dataTdEn: any = await prisma.tuyenDung.update({
        where: {
          id: 2,
        },
        data: {
          taiSaoLamViec: newDataEn,
        },
      });

      return 'thành công update banner tiếng anh và tiếng việt';
    } catch (error) {
      if (error.message == 'All proxies failed') {
        return 'Dịch thất bại';
      }
    }
  }

  async updateContentTSLVTd(infoUpdate: any, lg) {
    const prisma = new PrismaClient();
    let status = '';

    if (lg == 'vn') {
      status = await this.updateContentTSLVTdVn(infoUpdate.content);
    } else if (lg == 'en') {
      status = await this.updateContentTSLVTdEn(infoUpdate.content);
    } else if (lg == 'full') {
      status = await this.updateContentTSLVTdFull(infoUpdate.content);
    }

    return status;
  }
}
