import { InternalUserModel } from "@domain/models";

export interface IUserReportRepository {
  save(users: InternalUserModel[]): Promise<InternalUserModel[]>;
}

export const USER_REPORT_REPOSITORY = "USER_REPORT_REPOSITORY";
