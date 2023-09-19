import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorEntity } from './author.entity';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Create an author' })
  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Read all authors' })
  @Get()
  async findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({ summary: 'Read an author by id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an author by id' })
  @ApiAcceptedResponse({
    description: 'The author has been successfully updated.',
    type: AuthorEntity,
  })
  @ApiNotFoundResponse({
    description: 'The author with the specified id was not found.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Delete an author by id' })
  @ApiAcceptedResponse({
    description: 'The author has been successfully deleted.',
    type: AuthorEntity,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
