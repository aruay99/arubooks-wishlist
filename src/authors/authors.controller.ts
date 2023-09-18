import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {
  ApiAcceptedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorEntity } from './entities/author.entity';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Create an author' })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Read all authors' })
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({ summary: 'Read an author by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
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
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Delete an author by id' })
  @ApiAcceptedResponse({
    description: 'The author has been successfully deleted.',
    type: AuthorEntity,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
