import { Injectable } from '@nestjs/common';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'nestjs-prisma';
import { Author, Prisma } from '@prisma/client';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAuthorDto): Promise<Author> {
    const data: Prisma.AuthorCreateInput = dto;
    return this.prisma.author.create({
      data,
    });
  }

  findAll() {
    return this.prisma.author.findMany();
  }

  findOne(id: string) {
    return this.prisma.author.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
