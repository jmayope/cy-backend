import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ForbiddenException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_MESSAGES } from '../error-message';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {

  catch(exception: ForbiddenException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(403).json({
      success: false,
      statusCode: 403,
      message: ERROR_MESSAGES.FORBIDDEN,
      path: request.url,
      timestamp: new Date().toISOString()
    });

  }
}