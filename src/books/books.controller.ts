import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book as BookModel } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Read all books' })
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // TODO: handle author not found
  @ApiOperation({ summary: 'Create a book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @Post()
  create(@Body() dto: CreateBookDto): Promise<BookModel> {
    return this.booksService.create(dto);
  }
}
