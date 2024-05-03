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
    return {
      headerPage: dataHeader,
      homePage: dataHomePage,
      tuyenDung: dataTuyenDung,
    };
  }
  async getContentFull() {
    const prisma = new PrismaClient();

    const dataPage = await prisma.homepage.findMany();
    const dataTuyenDung = await prisma.tuyenDung.findMany();
    return {
      dataPageVn: dataPage[0],
      dataPageEn: dataPage[1],
      dataTuyenDungVn: dataTuyenDung[0],
      dataTuyenDungEn: dataTuyenDung[1],
    };
  }
}
