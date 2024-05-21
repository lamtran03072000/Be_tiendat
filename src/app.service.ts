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
    const dataAbout = await prisma.veChungToi.findUnique({
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

    const dataPageSanPham = await prisma.pageSanPham.findUnique({
      where: { id: idLanguage },
    });
    const dataThongTinThem = await prisma.thongTin.findUnique({
      where: { id: 1 },
    });
    return {
      headerPage: dataHeader,
      homePage: dataHomePage,
      tuyenDung: dataTuyenDung,
      dssp: dataDssp,
      lienHe: dataLienHe,
      about: dataAbout,
      pageSanPham: dataPageSanPham,
      dataThongTinThem,
    };
  }
  async getContentFull() {
    const prisma = new PrismaClient();

    const dataPage = await prisma.homepage.findMany();
    const dataTuyenDung = await prisma.tuyenDung.findMany();
    const dataLienHe = await prisma.lienHe.findMany();
    const dataAbout = await prisma.veChungToi.findMany();
    const dataPageSanPham = await prisma.pageSanPham.findMany();
    const dataThongTinThem = await prisma.thongTin.findUnique({
      where: { id: 1 },
    });
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
      dataAboutVn: dataAbout[0],
      dataAboutEn: dataAbout[1],
      dataPageSanPhamEn: dataPageSanPham[1],
      dataPageSanPhamVn: dataPageSanPham[0],
      dataThongTinThem,
    };
  }

  async login(userData) {
    try {
      const prisma = new PrismaClient();

      let user = await prisma.user.findFirst({
        where: {
          taiKhoan: String(userData.taiKhoan),
        },
      });

      if (user.matKhau == userData.matKhau) {
        return {
          privateLogin: 'tienDatSuccess',
        };
      } else {
        return {
          privateLogin: 'tienDatFail',
        };
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
