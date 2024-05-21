import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Injectable()
export class PageAboutService {
  constructor(private readonly translationService: TranslationTextService) {}

  async updateCoreValue(lg, data) {
    try {
      const prisma = new PrismaClient();
      let status = '';

      if (lg == 'vn') {
        await prisma.veChungToi.update({
          where: {
            id: 1,
          },
          data: {
            coreValues: {
              title: data.titleVn,
              listData: data.dataListVn,
            },
          },
        });
        await prisma.veChungToi.update({
          where: {
            id: 2,
          },
          data: {
            coreValues: {
              title: data.titleEn,
              listData: data.dataListEn,
            },
          },
        });
        return 'Update thành công';
      } else if (lg == 'full') {
        const titleEn = await this.translationService.translateWithProxies(
          data.titleVn,
          'en',
        );
        const listDataEn = await this.translationService.translateWithProxies(
          data.dataListVn,
          'en',
        );

        function normalizeKeys(data) {
          return data.map((item) => {
            const normalizedItem = {};
            Object.keys(item).forEach((key) => {
              const trimmedKey = key.trim(); // Loại bỏ khoảng trắng ở hai đầu của key
              normalizedItem[trimmedKey] = item[key]; // Gán giá trị cho key mới đã được chuẩn hóa
            });
            return normalizedItem;
          });
        }

        const newListDataEn = normalizeKeys(listDataEn);

        await prisma.veChungToi.update({
          where: {
            id: 1,
          },
          data: {
            coreValues: {
              title: data.titleVn,
              listData: data.dataListVn,
            },
          },
        });
        await prisma.veChungToi.update({
          where: {
            id: 2,
          },
          data: {
            coreValues: {
              title: titleEn,
              listData: newListDataEn,
            },
          },
        });
        return 'Update thành công tiếng anh sang tiếng việt';
      }
    } catch (error) {}
  }

  async updateDes(lg, data) {
    try {
      const prisma = new PrismaClient();
      if (lg == 'vn') {
        await prisma.veChungToi.update({
          where: {
            id: 1,
          },
          data: {
            des: data.vn,
          },
        });
        await prisma.veChungToi.update({
          where: {
            id: 2,
          },
          data: {
            des: data.en,
          },
        });
        return 'thành công update ';
      } else if (lg == 'full') {
        const dataVnToEn = await this.translationService.translateWithProxies(
          data.vn,
          'en',
        );

        await prisma.veChungToi.update({
          where: {
            id: 1,
          },
          data: {
            des: data.vn,
          },
        });
        await prisma.veChungToi.update({
          where: {
            id: 2,
          },
          data: {
            des: dataVnToEn,
          },
        });
      }

      return 'thành công update tiếng anh và tiếng việt';
    } catch (error) {}
  }

  async updateBanner(data, lg) {
    console.log('no');
    try {
      const prisma = new PrismaClient();
      if (lg == 'vn') {
        await prisma.veChungToi.update({
          where: {
            id: 1,
          },
          data: {
            banner: data.dataVn,
          },
        });
        await prisma.veChungToi.update({
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

        await prisma.veChungToi.update({
          where: {
            id: 1,
          },
          data: {
            banner: data.dataVn,
          },
        });
        await prisma.veChungToi.update({
          where: {
            id: 2,
          },
          data: {
            banner: dataVnToEn,
          },
        });
        return 'thành công update content tiếng việt và tiếng anh';
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
