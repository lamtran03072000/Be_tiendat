import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TranslationTextService } from 'src/translation-text/translation-text.service';

@Injectable()
export class SanPhamService {
  constructor(private readonly translationService: TranslationTextService) {}

  async updateBanner(data, lg) {
    try {
      const prisma = new PrismaClient();
      if (lg == 'vn') {
        await prisma.pageSanPham.update({
          where: {
            id: 1,
          },
          data: {
            banner: data.dataVn,
          },
        });
        await prisma.pageSanPham.update({
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

        await prisma.pageSanPham.update({
          where: {
            id: 1,
          },
          data: {
            banner: data.dataVn,
          },
        });
        await prisma.pageSanPham.update({
          where: {
            id: 2,
          },
          data: {
            banner: dataVnToEn,
          },
        });
        return 'Thành công update content Tiếng Việt và Tiếng Anh';
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async deleteSp(id) {
    try {
      const prisma = new PrismaClient();
      await prisma.sanPham.delete({
        where: {
          id: Number(id),
        },
      });
      return 'Xoá thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async postSp(idDssp, dataSp) {
    try {
      const prisma = new PrismaClient();
      let nameToEn = await this.translationService.translateWithProxies(
        dataSp.name,
        'en',
      );
      let infoToEn = await this.translationService.translateWithProxies(
        dataSp.info,
        'en',
      );
      let desToEn = await this.translationService.translateWithProxies(
        dataSp.des,
        'en',
      );
      await prisma.sanPham.create({
        data: {
          idDanhSach: Number(idDssp),
          nameVn: dataSp.name,
          nameEn: nameToEn,
          infoVn: dataSp.info,
          infoEn: infoToEn,
          desVn: dataSp.des,
          desEn: desToEn,
          imgExtra: dataSp.imgExtra,
          imgDesArray: dataSp.imgDesArray,
        },
      });
      return 'Thêm thành công sản phẩm';
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getSp(idSp) {
    try {
      const prisma = new PrismaClient();
      let data;
      if (idSp) {
        data = await prisma.sanPham.findUnique({
          where: {
            id: Number(idSp),
          },
        });
      } else {
        data = await prisma.sanPham.findMany();
      }

      return data;
    } catch (error) {}
  }

  async updateSpFull(idSp, dataSp) {
    try {
      const prisma = new PrismaClient();

      const { nameVn, infoVn, desVn, imgExtra } = dataSp;

      let nameEn = await this.translationService.translateWithProxies(
        nameVn,
        'en',
      );
      let infoEn = await this.translationService.translateWithProxies(
        infoVn,
        'en',
      );
      let desEn = await this.translationService.translateWithProxies(
        desVn,
        'en',
      );
      await prisma.sanPham.update({
        where: {
          id: Number(idSp),
        },
        data: {
          nameEn,
          infoEn,
          desEn,
          imgExtra,
          nameVn,
          desVn,
          infoVn,
        },
      });
      return 'update tiếng anh & tiếng việt thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async updateSpEN(idSp, dataSp) {
    try {
      const prisma = new PrismaClient();

      const { nameEn, infoEn, desEn, imgExtra } = dataSp;

      await prisma.sanPham.update({
        where: {
          id: Number(idSp),
        },
        data: {
          nameEn,
          infoEn,
          desEn,
          imgExtra,
        },
      });
      return 'update tiếng anh thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async updateSpVN(idSp, dataSp) {
    try {
      const prisma = new PrismaClient();

      const { nameVn, infoVn, desVn, imgExtra } = dataSp;

      await prisma.sanPham.update({
        where: {
          id: Number(idSp),
        },
        data: {
          nameVn: nameVn,
          infoVn,
          desVn,
          imgExtra,
        },
      });
      return 'update tiếng việt thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async updateSp(idSp, lg, dataSp) {
    try {
      let status = '';

      if (lg == 'vn') {
        status = await this.updateSpVN(idSp, dataSp);
      } else if (lg == 'en') {
        status = await this.updateSpEN(idSp, dataSp);
      } else if (lg == 'full') {
        status = await this.updateSpFull(idSp, dataSp);
      }

      return status;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async createDssp(data) {
    try {
      const prisma = new PrismaClient();
      const nameEn = await this.translationService.translateWithProxies(
        data.name,
        'en',
      );
      await prisma.danhSachSanPham.create({
        data: {
          nameEn,
          nameVn: data.name,
          img: String(data.img),
          isHidden: true,
        },
      });
      return 'thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async deleteDssp(id) {
    try {
      const prisma = new PrismaClient();
      await prisma.danhSachSanPham.update({
        where: {
          id: Number(id),
        },
        data: {
          isHidden: false,
        },
      });
      return 'Xoá thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getDssp(idDssp) {
    try {
      const prisma = new PrismaClient();

      const data = await prisma.danhSachSanPham.findUnique({
        where: {
          id: Number(idDssp),
        },
      });
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async updateDsspVn(dataUpdate, idDssp) {
    try {
      const prisma = new PrismaClient();
      await prisma.danhSachSanPham.update({
        where: {
          id: Number(idDssp),
        },
        data: {
          nameVn: dataUpdate.nameVn,
          img: String(dataUpdate.img),
        },
      });
      return 'Update tiếng việt thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async updateDsspEn(dataUpdate, idDssp) {
    try {
      const prisma = new PrismaClient();
      await prisma.danhSachSanPham.update({
        where: {
          id: Number(idDssp),
        },
        data: {
          nameEn: dataUpdate.nameEn,
          img: String(dataUpdate.img),
        },
      });
      return 'Update tiếng anh thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async updateDsspFull(dataUpdate, idDssp) {
    try {
      const prisma = new PrismaClient();

      let nameEn = await this.translationService.translateWithProxies(
        dataUpdate.nameVn,
        'en',
      );
      await prisma.danhSachSanPham.update({
        where: {
          id: Number(idDssp),
        },
        data: {
          nameVn: dataUpdate.nameVn,
          nameEn: nameEn,
          img: String(dataUpdate.img),
        },
      });
      return 'Update tiếng việt & tiếng anh thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async updateDssp(lg, dataUpdate, idDssp) {
    try {
      let status = '';

      if (lg == 'vn') {
        status = await this.updateDsspVn(dataUpdate, idDssp);
      } else if (lg == 'en') {
        status = await this.updateDsspEn(dataUpdate, idDssp);
      } else if (lg == 'full') {
        status = await this.updateDsspFull(dataUpdate, idDssp);
      }

      return status;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async deleteImgDes(idImg, idSp) {
    try {
      const prisma = new PrismaClient();
      const data = await prisma.sanPham.findUnique({
        where: {
          id: Number(idSp),
        },
      });
      const imgDesAraay: any = data.imgDesArray;
      let newImgDesArray = imgDesAraay.filter((item) => item != idImg);

      await prisma.sanPham.update({
        where: {
          id: Number(idSp),
        },
        data: {
          imgDesArray: newImgDesArray,
        },
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async postImgDes(idImg, idSp) {
    try {
      const prisma = new PrismaClient();

      const data = await prisma.sanPham.findUnique({
        where: {
          id: Number(idSp),
        },
      });
      const newImgDesAraay: any = data.imgDesArray;
      newImgDesAraay.push(Number(idImg));

      await prisma.sanPham.update({
        where: {
          id: Number(idSp),
        },
        data: {
          imgDesArray: newImgDesAraay,
        },
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
