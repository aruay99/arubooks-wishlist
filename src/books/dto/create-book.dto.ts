import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  authorId: string;

  @IsDate()
  @Type(() => Date)
  releasedAt: Date;

  @IsString({ each: true })
  genreNames: string[];
}
