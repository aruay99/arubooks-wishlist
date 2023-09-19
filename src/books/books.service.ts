import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { type Book, type Prisma } from '@prisma/client';
import { GenresService } from '../genres/genres.service';
import { type CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly genres: GenresService,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const { title, authorId, releasedAt, genreNames } = dto;

    const genres = await this.genres.upsertManyByName(genreNames);
    const data: Prisma.BookCreateInput = {
      title,
      releasedAt,
      author: {
        connect: {
          id: authorId,
        },
      },
      genres: {
        create: genres.map((genre) => ({ genreName: genre.name })),
      },
    };

    return this.prisma.book.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: string) {
    return this.prisma.book.findUniqueOrThrow({
      where: { id },
    });
  }
}
