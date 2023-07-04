import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    return response.status(status).json({
      success: false,
      data: {},
      error: {
        type: exception.name,
        message:
          exception.name === "InternalServerErrorException"
            ? "Internal Server Error"
            : exception.message,
      },
    });
  }
}
