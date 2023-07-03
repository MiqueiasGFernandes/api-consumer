export interface IUserReportRepository {
  save(report: Buffer): Promise<{ link: string }>;
}

export const USER_REPORT_REPOSITORY = 'USER_REPORT_REPOSITORY';
