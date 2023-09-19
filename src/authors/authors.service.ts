import {Injectable} from '@nestjs/common';
import {PrismaService} from 'nestjs-prisma';
import {type Author} from '@prisma/client';
import {type UpdateAuthorDto} from './dto/update-author.dto';
import {type CreateAuthorDto} from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateAuthorDto): Promise<Author> {
		return this.prisma.author.create({data});
	}

	async findAll() {
		return this.prisma.author.findMany();
	}

	async findOne(id: string) {
		return this.prisma.author.findUniqueOrThrow({where: {id}});
	}

	async update(id: string, data: UpdateAuthorDto) {
		return this.prisma.author.update({
			where: {id},
			data,
		});
	}

	async remove(id: string) {
		return this.prisma.author.delete({where: {id}});
	}
}
