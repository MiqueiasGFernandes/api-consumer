import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
    this.name = 'ResourceNotFoundException';
    Error.captureStackTrace(this, this.constructor);
  }
}
