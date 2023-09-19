import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type Book as BookModel } from '@prisma/client';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookEntity } from './books.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // TODO: handle author not found
  @ApiOperation({ summary: 'Create a book' })
  @ApiCreatedResponse({
    description: 'The book has been successfully created.',
    type: BookEntity,
  })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Post()
  async create(@Body() dto: CreateBookDto): Promise<BookModel> {
    return this.booksService.create(dto);
  }

  @ApiOperation({ summary: 'Read all books' })
  @ApiOkResponse({
    description: 'The books have been successfully read.',
    type: BookEntity,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<BookModel[]> {
    return this.booksService.findAll();
  }

  @ApiOperation({ summary: 'Read a book by id' })
  @ApiOkResponse({
    description: 'The book has been successfully read.',
    type: BookEntity,
  })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookModel> {
    return this.booksService.findOne(id);
  }
}
