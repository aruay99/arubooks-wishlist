import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    const getStatus = (exceptionCode: string) => {
      switch (exceptionCode) {
        case 'P2002':
          return HttpStatus.CONFLICT;
        case 'P2025':
          return HttpStatus.NOT_FOUND;
        default:
          return HttpStatus.INTERNAL_SERVER_ERROR;
      }
    };
    const status = getStatus(exception.code);

    response.status(status).send({
      timestamp: new Date().toISOString(),
      status,
      message: exception.message.replace(/\n/g, ''),
      path: request.url,
    });
  }
}
