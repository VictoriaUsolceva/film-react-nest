import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const status = exception.getStatus();
    let message = exception.getResponse()['message'];
    if (!message) {
      message = exception.message;
    }

    const response = host.switchToHttp().getResponse();

    response.status(status).json({
      error: message,
    });
  }
}
