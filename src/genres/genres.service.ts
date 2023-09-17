import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Genre, Prisma } from '@prisma/client';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.GenreCreateInput): Promise<Genre> {
    return await this.prisma.genre.create({
      data,
    });
  }

  /**
   * Upsert many Genres by name, inserting the new ones and skipping the existing ones
   * @param genreNames - Array of Genre names
   */
  async upsertManyByName(genreNames: string[]): Promise<Genre[]> {
    await this.prisma.genre.createMany({
      data: genreNames.map((name) => ({ name })),
      skipDuplicates: true,
    });
    return await this.prisma.genre.findMany({
      where: {
        name: {
          in: genreNames,
        },
      },
    });
  }
}
