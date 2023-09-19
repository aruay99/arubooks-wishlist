import { HttpStatus, Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { AuthorsModule } from './authors/authors.module';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { GenresService } from './genres/genres.service';
import { GenresController } from './genres/genres.controller';

@Module({
  imports: [AuthorsModule, PrismaModule],
  controllers: [BooksController, GenresController],
  providers: [BooksService, GenresService],
})
export class AppModule {}
