import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_MESSAGES } from '../error-message';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {

  catch(exception: BadRequestException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(400).json({
      success: false,
      statusCode: 400,
      message: ERROR_MESSAGES.BAD_REQUEST,
      path: request.url,
      timestamp: new Date().toISOString()
    });

  }
}