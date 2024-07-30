import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let responseBody: any;

    if (typeof exceptionResponse === 'string') {
      responseBody = {
        statusCode: status,
        message: exceptionResponse,
      };
    } else {
      responseBody = {
        statusCode: status,
        ...exceptionResponse,
      };
    }

    response.status(status).json(responseBody);
  }
}
