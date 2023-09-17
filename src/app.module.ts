import { HttpStatus, Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { GenresService } from './genres/genres.service';
import { GenresController } from './genres/genres.controller';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';

@Module({
  imports: [AuthorsModule, PrismaModule],
  controllers: [BooksController, GenresController],
  providers: [
    BooksService,
    GenresService,
    providePrismaClientExceptionFilter({
      // see https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }),
  ],
})
export class AppModule {}
