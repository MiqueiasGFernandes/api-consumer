import { ReportUploadException } from '@domain/exceptions';
import {
  IUserReportRepository,
  USER_REPORT_REPOSITORY,
} from '@domain/repositories';
import { ISendCsvUseCase } from '@domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RemoteSendCsvService implements ISendCsvUseCase {
  constructor(
    @Inject(USER_REPORT_REPOSITORY)
    private readonly userReportRepository: IUserReportRepository,
  ) {}
  async send(csv: Buffer): Promise<string> {
    const { link } = await this.userReportRepository
      .save(csv)
      .catch((error) => {
        throw new ReportUploadException(error);
      });

    return link;
  }
}
