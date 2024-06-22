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

  async createCarousel(idImg) {
    try {
      const prisma = new PrismaClient();
      const dataVn: any = await prisma.tuyenDung.findUnique({
        where: {
          id: 1,
        },
        select: {
          carousel: true,
        },
      });

      const dataEn: any = await prisma.tuyenDung.findUnique({
        where: {
          id: 2,
        },
        select: {
          carousel: true,
        },
      });

      let newListDataImg = [...dataVn.carousel.listData, Number(idImg)];

      let newDataVn = { ...dataVn.carousel, listData: newListDataImg };
      let newDataEn = { ...dataEn.carousel, listData: newListDataImg };

      await prisma.tuyenDung.update({
        where: {
          id: 1,
        },
        data: {
          carousel: newDataVn,
        },
      });
      await prisma.tuyenDung.update({
        where: {
          id: 2,
        },
        data: {
          carousel: newDataEn,
        },
      });
      return 'thành công';
    } catch (error) {}
  }

  async deleteCarousel(idImg) {
    try {
      const prisma = new PrismaClient();
      const dataVn: any = await prisma.tuyenDung.findUnique({
        where: {
          id: 1,
        },
        select: {
          carousel: true,
        },
      });

      const dataEn: any = await prisma.tuyenDung.findUnique({
        where: {
          id: 2,
        },
        select: {
          carousel: true,
        },
      });

      let listDataNew = dataVn.carousel.listData;
      let indexImg = listDataNew.findIndex((item) => item == idImg);

      listDataNew.splice(indexImg, 1);

      let newDataVn = { ...dataVn.carousel, listData: listDataNew };
      let newDataEn = { ...dataEn.carousel, listData: listDataNew };

      await prisma.tuyenDung.update({
        where: {
          id: 1,
        },
        data: {
          carousel: newDataVn,
        },
      });
      await prisma.tuyenDung.update({
        where: {
          id: 2,
        },
        data: {
          carousel: newDataEn,
        },
      });
      return 'thành công';
    } catch (error) {}
  }
  async updateContentCarousel(payload, lg) {
    console.log('lg: ', lg);
    console.log('payload: ', payload);
    try {
      const prisma = new PrismaClient();

      if (lg == 'vn') {
        const dataVn: any = await prisma.tuyenDung.findUnique({
          where: {
            id: 1,
          },
        });
        const dataEn: any = await prisma.tuyenDung.findUnique({
          where: {
            id: 2,
          },
        });

        let newCarouselVn = {
          ...dataVn.carousel,
          des: payload.desVn,
          title: payload.titleVn,
        };

        let newCarouselEn = {
          ...dataEn.carousel,
          des: payload.desEn,
          title: payload.titleEn,
        };

        await prisma.tuyenDung.update({
          where: {
            id: 1,
          },
          data: {
            carousel: newCarouselVn,
          },
        });
        await prisma.tuyenDung.update({
          where: {
            id: 2,
          },
          data: {
            carousel: newCarouselEn,
          },
        });
      } else {
        const dataVn: any = await prisma.tuyenDung.findUnique({
          where: {
            id: 1,
          },
        });
        const dataEn: any = await prisma.tuyenDung.findUnique({
          where: {
            id: 2,
          },
        });
        let newCarouselVn = {
          ...dataVn.carousel,
          des: payload.desVn,
          title: payload.titleVn,
        };
        let desVNtoEn = await this.translationService.translateWithProxies(
          payload.desVn,
          'en',
        );
        let titleVNtoEn = await this.translationService.translateWithProxies(
          payload.titleVn,
          'en',
        );

        let newCarouselEn = {
          ...dataEn.carousel,
          des: desVNtoEn,
          title: titleVNtoEn,
        };

        await prisma.tuyenDung.update({
          where: {
            id: 1,
          },
          data: {
            carousel: newCarouselVn,
          },
        });
        await prisma.tuyenDung.update({
          where: {
            id: 2,
          },
          data: {
            carousel: newCarouselEn,
          },
        });
      }

      return 'thành công';
    } catch (error) {}
  }
}
