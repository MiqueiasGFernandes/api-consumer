import { HttpException, HttpStatus } from '@nestjs/common';

export class ItemAlreadyExistsException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
    this.name = 'ItemAlreadyExistsException';
    Error.captureStackTrace(this, this.constructor);
  }
}
