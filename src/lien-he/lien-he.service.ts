import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Injectable()
export class LienHeService {
  constructor(private readonly translationService: TranslationTextService) {}

  async updateZalo(sdt) {
    try {
      const prisma = new PrismaClient();
      await prisma.thongTin.update({
        where: {
          id: 1,
        },
        data: {
          sdt: sdt,
        },
      });
      return 'thay đổi số điện thoại zalo thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async updateChinhSach(data, lg) {
    try {
      const prisma = new PrismaClient();
      if (lg == 'vn') {
        await prisma.lienHe.update({
          where: {
            id: 1,
          },
          data: {
            chinhSachThanhToan: data.dataVn,
          },
        });
        await prisma.lienHe.update({
          where: {
            id: 2,
          },
          data: {
            chinhSachThanhToan: data.dataEn,
          },
        });
        return 'Update thành công';
      } else if (lg == 'full') {
        const dataVnToEn = await this.translationService.translateWithProxies(
          data.dataVn,
          'en',
        );

        function cleanKeys(data) {
          return data.map((item) => {
            const cleanedItem = {};
            Object.keys(item).forEach((key) => {
              cleanedItem[key.trim()] = item[key];
            });
            return cleanedItem;
          });
        }

        let newDataEn = cleanKeys(dataVnToEn);

        await prisma.lienHe.update({
          where: {
            id: 1,
          },
          data: {
            chinhSachThanhToan: data.dataVn,
          },
        });
        await prisma.lienHe.update({
          where: {
            id: 2,
          },
          data: {
            chinhSachThanhToan: newDataEn,
          },
        });
        return 'Update thành công tiếng anh và tiếng việt';
      }
    } catch (error) {}
  }

  async updateLienHe(data) {
    try {
      const prisma = new PrismaClient();
      await prisma.lienHe.updateMany({
        data: {
          lienHe: data,
        },
      });
    } catch (error) {}
  }

  async updateBanner(data, lg) {
    try {
      const prisma = new PrismaClient();
      if (lg == 'vn') {
        await prisma.lienHe.update({
          where: {
            id: 1,
          },
          data: {
            banner: data.dataVn,
          },
        });
        await prisma.lienHe.update({
          where: {
            id: 2,
          },
          data: {
            banner: data.dataEn,
          },
        });
        return 'thành công update content';
      } else if (lg == 'full') {
        const dataVnToEn = await this.translationService.translateWithProxies(
          data.dataVn,
          'en',
        );

        await prisma.lienHe.update({
          where: {
            id: 1,
          },
          data: {
            banner: data.dataVn,
          },
        });
        await prisma.lienHe.update({
          where: {
            id: 2,
          },
          data: {
            banner: dataVnToEn,
          },
        });
        return 'thành công update content tiếng việt và tiếng anh';
      }
    } catch (error) {}
  }
}
