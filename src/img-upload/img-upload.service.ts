import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { join } from 'path';

// const HOST = '61.14.233.55:8000';
const HOST = 'https://be.daitiendat.vn';
// const HOST = 'http://localhost:8000';
@Injectable()
export class ImgUploadService {
  async updateImg(file, idPreImg) {
    const prisma = new PrismaClient();

    try {
      const dataFind = await prisma.img.findUnique({
        where: {
          id: Number(idPreImg),
        },
      });
      if (dataFind) {
        // xoá hình cũ
        const dataRm = await prisma.img.delete({
          where: {
            id: Number(idPreImg),
          },
        });
        const filePath = join(process.cwd(), '..', 'img-tiendat', dataRm.img);

        await fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.log('error: ', error);
    }

    try {
      // tạo hình mới

      const data = await prisma.img.create({
        data: {
          img: file.filename,
        },
      });

      // trả về id
      return {
        idImg: data.id,
      };
    } catch (error) {
      console.log('error:ádasdsa ', error);
    }
  }
  async getLinkUrl(idImg) {
    try {
      if (idImg !== 'undefined') {
        const prisma = new PrismaClient();
        const dataImg = await prisma.img.findUnique({
          where: {
            id: Number(idImg),
          },
        });

        const linkUrl = HOST + '/img-tiendat/' + dataImg.img;
        return {
          img: linkUrl,
        };
      }
    } catch (error) {
      console.log('error:sadasd ', error);
    }
  }
}
