import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  async getContent(lg) {
    let idLanguage = 1;
    if (lg == 'en') {
      idLanguage = 2;
    }

    const prisma = new PrismaClient();

    const dataHomePage = await prisma.homepage.findUnique({
      where: {
        id: idLanguage,
      },
    });

    const dataTuyenDung = await prisma.tuyenDung.findUnique({
      where: {
        id: idLanguage,
      },
    });

    const dataHeader = await prisma.header.findUnique({
      where: { id: idLanguage },
    });
    const dataLienHe = await prisma.lienHe.findUnique({
      where: { id: idLanguage },
    });

    const dataDssp = await prisma.danhSachSanPham.findMany({
      include: {
        sanPham: true,
      },
      where: {
        isHidden: true,
      },
    });
    return {
      headerPage: dataHeader,
      homePage: dataHomePage,
      tuyenDung: dataTuyenDung,
      dssp: dataDssp,
      lienHe: dataLienHe,
    };
  }
  async getContentFull() {
    const prisma = new PrismaClient();

    const dataPage = await prisma.homepage.findMany();
    const dataTuyenDung = await prisma.tuyenDung.findMany();
    const dataLienHe = await prisma.lienHe.findMany();
    const dataSanPham = await prisma.danhSachSanPham.findMany({
      where: {
        isHidden: true,
      },
      include: {
        sanPham: true,
      },
    });
    return {
      dataPageVn: dataPage[0],
      dataPageEn: dataPage[1],
      dataTuyenDungVn: dataTuyenDung[0],
      dataTuyenDungEn: dataTuyenDung[1],
      dataLienHeEn: dataLienHe[1],
      dataLienHeVn: dataLienHe[0],
      dataSanPham: dataSanPham,
    };
  }
}
