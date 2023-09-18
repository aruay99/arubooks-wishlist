import { Injectable } from '@nestjs/common';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'nestjs-prisma';
import { Author } from '@prisma/client';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAuthorDto): Promise<Author> {
    return this.prisma.author.create({ data });
  }

  findAll() {
    return this.prisma.author.findMany();
  }

  findOne(id: string) {
    return this.prisma.author.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, data: UpdateAuthorDto) {
    return this.prisma.author.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.author.delete({ where: { id } });
  }
}
