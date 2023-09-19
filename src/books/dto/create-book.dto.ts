import {IsDate, IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CreateBookDto {
	@IsString()
	@ApiProperty({description: 'The title of the book', example: 'The Hobbit'})
		title: string;

	@IsString()
	@ApiProperty({description: 'ID of the author of the book', example: '753dfa6d-9b50-4c7d-bfc8-e1835308b10c'})
		authorId: string;

	@IsDate()
	@ApiProperty({description: 'The date when the book was released. Formatted as ISO 8601', example: '1937-09-21T00:00:00.000Z'})
	@Type(() => Date)
		releasedAt: Date;

	@IsString({each: true})
	@ApiProperty({description: 'The genres of the book', example: ['Fantasy', 'Adventure']})
		genreNames: string[];
}
