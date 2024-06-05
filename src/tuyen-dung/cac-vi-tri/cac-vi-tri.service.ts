import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TranslationTextService } from 'src/translation-text/translation-text.service';
@Injectable()
export class CacViTriService {
  constructor(private readonly translationService: TranslationTextService) {}
  async postViTri(infoViTri) {
    try {
      const prisma = new PrismaClient();

      let cvc: any = await prisma.tuyenDung.findMany({
        select: {
          cacViTriTuyenDung: true,
        },
      });

      const cacViTriVn = cvc[0].cacViTriTuyenDung.cacViTri;
      const cacViTriEn = cvc[1].cacViTriTuyenDung.cacViTri;

      let chiTietEn = await this.translationService.translateWithProxies(
        infoViTri.chiTiet,
        'en',
      );
      let soLuongEn = await this.translationService.translateWithProxies(
        infoViTri.soLuong,
        'en',
      );
      let tenViTriEn = await this.translationService.translateWithProxies(
        infoViTri.tenViTri,
        'en',
      );

      let id = Date.now();
      let newCacViTriVn = [...cacViTriVn, { ...infoViTri, id }];
      let newCacViTriEn = [
        ...cacViTriEn,
        {
          id,
          chiTiet: chiTietEn,
          tenViTri: tenViTriEn,
          soLuong: soLuongEn,
        },
      ];

      let newCvcVn = { ...cvc[0].cacViTriTuyenDung, cacViTri: newCacViTriVn };
      // console.log('newCvcVn: ', newCvcVn);
      let newCvcEn = { ...cvc[1].cacViTriTuyenDung, cacViTri: newCacViTriEn };
      await prisma.tuyenDung.update({
        where: {
          id: 1,
        },
        data: {
          cacViTriTuyenDung: newCvcVn,
        },
      });
      await prisma.tuyenDung.update({
        where: {
          id: 2,
        },
        data: {
          cacViTriTuyenDung: newCvcEn,
        },
      });
      return 'thành công thêm vị trí';
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async deleteViTri(idViTri) {
    try {
      const prisma = new PrismaClient();
      let cvc: any = await prisma.tuyenDung.findMany({
        select: {
          cacViTriTuyenDung: true,
        },
      });

      const cacViTriVn = cvc[0].cacViTriTuyenDung.cacViTri;
      const cacViTriEn = cvc[1].cacViTriTuyenDung.cacViTri;

      let indexEn = cacViTriEn.findIndex((item) => item.id == idViTri);
      let indexVn = cacViTriVn.findIndex((item) => item.id == idViTri);

      cacViTriVn.splice(indexVn, 1);
      cacViTriEn.splice(indexEn, 1);
      let newCvcVn = { ...cvc[0].cacViTriTuyenDung, cacViTri: cacViTriVn };
      let newCvcEn = { ...cvc[1].cacViTriTuyenDung, cacViTri: cacViTriEn };
      await prisma.tuyenDung.update({
        where: {
          id: 1,
        },
        data: {
          cacViTriTuyenDung: newCvcVn,
        },
      });
      await prisma.tuyenDung.update({
        where: {
          id: 2,
        },
        data: {
          cacViTriTuyenDung: newCvcEn,
        },
      });
      return 'thành công xoá';
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async updateViTri(infoViTri) {
    try {
      const prisma = new PrismaClient();
      let cvc: any = await prisma.tuyenDung.findMany({
        select: {
          cacViTriTuyenDung: true,
        },
      });

      let newCvcVn = {
        ...cvc[0].cacViTriTuyenDung,
        cacViTri: infoViTri.newCVTVn,
      };
      let newCvcEn = {
        ...cvc[1].cacViTriTuyenDung,
        cacViTri: infoViTri.newCVTEn,
      };

      await prisma.tuyenDung.update({
        where: {
          id: 1,
        },
        data: {
          cacViTriTuyenDung: newCvcVn,
        },
      });
      await prisma.tuyenDung.update({
        where: {
          id: 2,
        },
        data: {
          cacViTriTuyenDung: newCvcEn,
        },
      });
      return 'thành công Sửa vị trí';
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async updateContentVn(idUpdate, content) {
    const prisma = new PrismaClient();

    try {
      const prisma = new PrismaClient();
      let cvc: any = await prisma.tuyenDung.findMany({
        select: {
          cacViTriTuyenDung: true,
        },
      });

      const cacViTriVn = cvc[0].cacViTriTuyenDung.cacViTri;

      let indexVn = cacViTriVn.findIndex((item) => item.id == idUpdate);

      cacViTriVn[indexVn] = content.viTriVn;
      let newCvcVn = {
        ...cvc[0].cacViTriTuyenDung,
        cacViTri: cacViTriVn,
      };
      await prisma.tuyenDung.update({
        where: {
          id: 1,
        },
        data: {
          cacViTriTuyenDung: newCvcVn,
        },
      });
      return 'Thành công update tiếng việt';
    } catch (error) {}
  }

  async updateContentEn(idUpdate, content) {
    try {
      const prisma = new PrismaClient();

      let cvc: any = await prisma.tuyenDung.findMany({
        select: {
          cacViTriTuyenDung: true,
        },
      });

      const cacViTriEn = cvc[1].cacViTriTuyenDung.cacViTri;

      let indexEn = cacViTriEn.findIndex((item) => item.id == idUpdate);

      cacViTriEn[indexEn] = content.viTriEn;
      let newCvcEn = {
        ...cvc[1].cacViTriTuyenDung,
        cacViTri: cacViTriEn,
      };
      await prisma.tuyenDung.update({
        where: {
          id: 2,
        },
        data: {
          cacViTriTuyenDung: newCvcEn,
        },
      });
      return 'Thành công update tiếng anh';
    } catch (error) {}
  }

  async updateContentFull(idUpdate, content) {
    try {
      const prisma = new PrismaClient();

      let cvc: any = await prisma.tuyenDung.findMany({
        select: {
          cacViTriTuyenDung: true,
        },
      });

      const cacViTriVn = cvc[0].cacViTriTuyenDung.cacViTri;
      const cacViTriEn = cvc[1].cacViTriTuyenDung.cacViTri;
      let indexVn = cacViTriVn.findIndex((item) => item.id == idUpdate);
      let indexEn = cacViTriEn.findIndex((item) => item.id == idUpdate);
      cacViTriVn[indexVn] = content.viTriVn;

      let chiTietEn = await this.translationService.translateWithProxies(
        content.viTriVn.chiTiet,
        'en',
      );
      let soLuongEn = await this.translationService.translateWithProxies(
        content.viTriVn.soLuong,
        'en',
      );
      let tenViTriEn = await this.translationService.translateWithProxies(
        content.viTriVn.tenViTri,
        'en',
      );

      let contentTranslateEn = {
        id: Number(idUpdate),
        chiTiet: chiTietEn,
        soLuong: soLuongEn,
        tenViTri: tenViTriEn,
        hinhAnh: content.viTriVn.hinhAnh,
      };
      cacViTriEn[indexEn] = contentTranslateEn;

      let newCvcEn = {
        ...cvc[1].cacViTriTuyenDung,
        cacViTri: cacViTriEn,
      };
      let newCvcVn = {
        ...cvc[0].cacViTriTuyenDung,
        cacViTri: cacViTriVn,
      };
      await prisma.tuyenDung.update({
        where: {
          id: 2,
        },
        data: {
          cacViTriTuyenDung: newCvcEn,
        },
      });
      await prisma.tuyenDung.update({
        where: {
          id: 1,
        },
        data: {
          cacViTriTuyenDung: newCvcVn,
        },
      });
      return 'thành công update tiếng anh và tiếng việt';
    } catch (error) {}
  }

  async updateContent(infoViTri, lg, idUpdate) {
    try {
      let status = '';

      if (lg == 'vn') {
        status = await this.updateContentVn(idUpdate, infoViTri);
      } else if (lg == 'en') {
        status = await this.updateContentEn(idUpdate, infoViTri);
      } else if (lg == 'full') {
        status = await this.updateContentFull(idUpdate, infoViTri);
      }

      return status;
    } catch (error) {}
  }
}
