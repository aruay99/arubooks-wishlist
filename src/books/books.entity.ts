import { ApiProperty } from '@nestjs/swagger';
import { Book } from '@prisma/client';

export class BookEntity implements Book {
  @ApiProperty({
    description: 'The id of the book.',
    example: '15a8803c-b372-4432-9fca-4a91e5b5e261',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the book.',
    example: "The Hitchhiker's Guide to the Galaxy",
  })
  title: string;

  @ApiProperty({
    description: 'The author id of the book.',
    example: '15a8803c-b372-4432-9fca-4a91e5b5e261',
  })
  authorId: string;

  @ApiProperty({
    description: 'The description of the book.',
    example:
      "The Hitchhiker's Guide to the Galaxy is a comedy science fiction series created by Douglas Adams.",
  })
  description: string;

  @ApiProperty({
    description: 'The release date of the book. Formatted in ISO 8601.',
    example: '1979-10-12T00:00:00.000Z',
  })
  releasedAt: Date;

  @ApiProperty({
    description: 'The date the book entity was created. Formatted in ISO 8601.',
    example: '2021-03-02T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date the book entity was updated. Formatted in ISO 8601.',
    example: '2021-03-02T00:00:00.000Z',
  })
  updatedAt: Date;
}
