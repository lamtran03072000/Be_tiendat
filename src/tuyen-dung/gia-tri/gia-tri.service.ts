import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Injectable()
export class GiaTriService {
  constructor(private readonly translationService: TranslationTextService) {}

  async updateGiaTri(lg, dataGiatri) {
    try {
      const prisma = new PrismaClient();
      let status = '';

      if (lg == 'vn') {
        await prisma.tuyenDung.update({
          where: {
            id: 1,
          },
          data: {
            giaTri: {
              idYoutube: dataGiatri.idYoutube,
              title: dataGiatri.titleVn,
              listData: dataGiatri.dataListVn,
            },
          },
        });
        await prisma.tuyenDung.update({
          where: {
            id: 2,
          },
          data: {
            giaTri: {
              idYoutube: dataGiatri.idYoutube,
              title: dataGiatri.titleEn,
              listData: dataGiatri.dataListEn,
            },
          },
        });
        return 'Update thành công';
      } else if (lg == 'full') {
        const titleEn = await this.translationService.translateWithProxies(
          dataGiatri.titleVn,
          'en',
        );
        const listDataEn = await this.translationService.translateWithProxies(
          dataGiatri.dataListVn,
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

        await prisma.tuyenDung.update({
          where: {
            id: 1,
          },
          data: {
            giaTri: {
              idYoutube: dataGiatri.idYoutube,
              title: dataGiatri.titleVn,
              listData: dataGiatri.dataListVn,
            },
          },
        });
        await prisma.tuyenDung.update({
          where: {
            id: 2,
          },
          data: {
            giaTri: {
              idYoutube: dataGiatri.idYoutube,
              title: titleEn,
              listData: newListDataEn,
            },
          },
        });
        return 'Update thành công tiếng anh sang tiếng việt';
      }
    } catch (error) {}
  }
}
