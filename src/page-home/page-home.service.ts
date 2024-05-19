import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TranslationTextService } from 'src/translation-text/translation-text.service';
// import { translate } from '@vitalets/google-translate-api';

@Injectable()
export class PageHomeService {
  constructor(private readonly translationService: TranslationTextService) {}

  async deleteTVHA(idImg) {
    try {
      const prisma = new PrismaClient();
      const dataVn: any = await prisma.homepage.findUnique({
        where: {
          id: 1,
        },
        select: {
          tuLieuHinhAnh: true,
        },
      });

      const dataEn: any = await prisma.homepage.findUnique({
        where: {
          id: 2,
        },
        select: {
          tuLieuHinhAnh: true,
        },
      });

      let listDataNew = dataVn.tuLieuHinhAnh.listData;
      let indexImg = listDataNew.findIndex((item) => item == idImg);

      listDataNew.splice(indexImg, 1);

      let newDataVn = { ...dataVn.tuLieuHinhAnh, listData: listDataNew };
      let newDataEn = { ...dataEn.tuLieuHinhAnh, listData: listDataNew };

      await prisma.homepage.update({
        where: {
          id: 1,
        },
        data: {
          tuLieuHinhAnh: newDataVn,
        },
      });
      await prisma.homepage.update({
        where: {
          id: 2,
        },
        data: {
          tuLieuHinhAnh: newDataEn,
        },
      });
      return 'thành công';
    } catch (error) {}
  }

  async createTVHA(idImg) {
    try {
      const prisma = new PrismaClient();
      const dataVn: any = await prisma.homepage.findUnique({
        where: {
          id: 1,
        },
        select: {
          tuLieuHinhAnh: true,
        },
      });

      const dataEn: any = await prisma.homepage.findUnique({
        where: {
          id: 2,
        },
        select: {
          tuLieuHinhAnh: true,
        },
      });

      let newListDataImg = [...dataVn.tuLieuHinhAnh.listData, Number(idImg)];

      let newDataVn = { ...dataVn.tuLieuHinhAnh, listData: newListDataImg };
      let newDataEn = { ...dataEn.tuLieuHinhAnh, listData: newListDataImg };

      await prisma.homepage.update({
        where: {
          id: 1,
        },
        data: {
          tuLieuHinhAnh: newDataVn,
        },
      });
      await prisma.homepage.update({
        where: {
          id: 2,
        },
        data: {
          tuLieuHinhAnh: newDataEn,
        },
      });
      return 'thành công';
    } catch (error) {}
  }

  async updateLVUD(lg, dataLVUD) {
    try {
      const prisma = new PrismaClient();
      let status = '';

      if (lg == 'vn') {
        await prisma.homepage.update({
          where: {
            id: 1,
          },
          data: {
            linhVucUngDung: {
              title: dataLVUD.titleVn,
              listData: dataLVUD.dataListVn,
            },
          },
        });
        await prisma.homepage.update({
          where: {
            id: 2,
          },
          data: {
            linhVucUngDung: {
              title: dataLVUD.titleEn,
              listData: dataLVUD.dataListEn,
            },
          },
        });
        return 'Update thành công';
      } else if (lg == 'full') {
        const titleEn = await this.translationService.translateWithProxies(
          dataLVUD.titleVn,
          'en',
        );
        const listDataEn = await this.translationService.translateWithProxies(
          dataLVUD.dataListVn,
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

        await prisma.homepage.update({
          where: {
            id: 1,
          },
          data: {
            linhVucUngDung: {
              title: dataLVUD.titleVn,
              listData: dataLVUD.dataListVn,
            },
          },
        });
        await prisma.homepage.update({
          where: {
            id: 2,
          },
          data: {
            linhVucUngDung: {
              title: titleEn,
              listData: newListDataEn,
            },
          },
        });
        return 'Update thành công tiếng anh sang tiếng việt';
      }
    } catch (error) {}
  }

  async updateNumberVn(dataNumber) {
    try {
      const prisma = new PrismaClient();
      await prisma.homepage.update({
        where: {
          id: 1,
        },
        data: {
          number: dataNumber.numberVn,
        },
      });
      return 'thành công update tiếng việt';
    } catch (error) {}
  }

  async updateNumberEn(dataNumber) {
    try {
      const prisma = new PrismaClient();
      await prisma.homepage.update({
        where: {
          id: 2,
        },
        data: {
          number: dataNumber.numberEn,
        },
      });
      return 'thành công update tiếng anh';
    } catch (error) {}
  }

  async updateNumberFull(dataNumber) {
    try {
      const prisma = new PrismaClient();

      const dataEn = await this.translationService.translateWithProxies(
        dataNumber.numberVn,
        'en',
      );

      await prisma.homepage.update({
        where: {
          id: 2,
        },
        data: {
          number: dataEn,
        },
      });
      await prisma.homepage.update({
        where: {
          id: 1,
        },
        data: {
          number: dataNumber.numberVn,
        },
      });
      return 'thành công update tiếng việt & tiếng anh';
    } catch (error) {}
  }

  async updateNumber(lg, dataNumber) {
    let status = '';

    if (lg == 'vn') {
      status = await this.updateNumberVn(dataNumber);
    } else if (lg == 'en') {
      status = await this.updateNumberEn(dataNumber);
    } else if (lg == 'full') {
      status = await this.updateNumberFull(dataNumber);
    }

    return status;
  }
}
