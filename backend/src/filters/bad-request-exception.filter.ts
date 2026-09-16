import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const message = exception.message;

    const response = host.switchToHttp().getResponse();

    response.status(status).json({
      error: message,
    });
  }
}
