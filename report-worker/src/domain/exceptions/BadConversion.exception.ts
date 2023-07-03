export class BadConversionException extends Error {
  constructor(details: any) {
    super(
      `Somenthing was wrong during JSON to CSV conversion: ${JSON.stringify(
        details,
      )}`,
    );
    this.name = 'BadConversionException';
    Error.captureStackTrace(this, BadConversionException.constructor);
  }
}
