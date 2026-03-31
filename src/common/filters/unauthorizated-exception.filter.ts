import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_MESSAGES } from '../error-message';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {

  catch(exception: UnauthorizedException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(401).json({
      success: false,
      statusCode: 401,
      message: ERROR_MESSAGES.UNAUTHORIZED,
      path: request.url,
      timestamp: new Date().toISOString()
    });

  }
}