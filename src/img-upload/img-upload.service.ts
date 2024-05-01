import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { join } from 'path';

// const HOST = '61.14.233.55:8000';
const HOST = 'https://be.lamtran.click';
// const HOST = 'http://localhost:8000';
@Injectable()
export class ImgUploadService {
  async updateImg(file, idPreImg) {
    try {
      const prisma = new PrismaClient();

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
      console.log('error: ', error);
    }
  }
  async getLinkUrl(idImg) {
    try {
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
    } catch (error) {}
  }
}
