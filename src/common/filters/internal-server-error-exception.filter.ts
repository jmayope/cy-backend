import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_MESSAGES } from '../error-message';

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {

  catch(exception: InternalServerErrorException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(500).json({
      success: false,
      statusCode: 500,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      path: request.url,
      timestamp: new Date().toISOString()
    });

  }
}