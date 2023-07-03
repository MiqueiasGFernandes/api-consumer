import { ReportUploadException } from '@domain/exceptions';
import {
  IUserReportRepository,
  USER_REPORT_REPOSITORY,
} from '@domain/repositories';
import { ISendCsvUseCase } from '@domain/use-cases';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RemoteSendCsvService implements ISendCsvUseCase {
  private readonly logger = new Logger();
  constructor(
    @Inject(USER_REPORT_REPOSITORY)
    private readonly userReportRepository: IUserReportRepository,
  ) {}
  async send(csv: Buffer): Promise<string> {
    const { link } = await this.userReportRepository
      .save(csv)
      .catch((error) => {
        this.logger.error(error, error.stack);

        throw new ReportUploadException(error);
      });

    return link;
  }
}
