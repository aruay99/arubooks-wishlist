import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Book, Prisma } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { GenresService } from '../genres/genres.service';

@Injectable()
export class BooksService {
  constructor(
    private prisma: PrismaService,
    private genres: GenresService,
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

  findAll() {
    return this.prisma.book.findMany();
  }
}
