export class ReportUploadException extends Error {
  constructor(details: any) {
    super(
      `Somenthing was wrong during report upload: ${JSON.stringify(details)}`,
    );
    this.name = 'ReportUploadException';
    Error.captureStackTrace(this, ReportUploadException.constructor);
  }
}
