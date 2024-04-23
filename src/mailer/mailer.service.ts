import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MailerService {
  async postMailLienHe(formLienHe) {
    try {
      let newForm = { ...formLienHe, isCheck: false };
      const prisma = new PrismaClient();
      const dataPost = await prisma.mail.create({
        data: newForm,
      });
      return 'thành công';
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async findAll() {
    const prisma = new PrismaClient();

    try {
      const mailes = await prisma.mail.findMany();

      return mailes.reverse();
    } catch (error) {}
    return `This action returns all mailer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mailer`;
  }

  async remove(id: number) {
    const prisma = new PrismaClient();
    try {
      const data = await prisma.mail.delete({
        where: {
          id,
        },
      });
      return 'thành công';
    } catch (error) {}
    return `This action removes a #${id} mailer`;
  }
  async updateIsCheck(id: number) {
    const prisma = new PrismaClient();

    try {
      const data = await prisma.mail.update({
        where: {
          id: id,
        },
        data: {
          isCheck: true,
        },
      });
      console.log('data: ', data);
      return 'thành công';
    } catch (error) {}
    return `This action removes a #${id} mailer`;
  }
}
