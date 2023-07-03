import { ExternalUserContactModel } from "../models";

export interface IExternalUserContactRepository {
  findOneBy(options: { userId: number }): Promise<ExternalUserContactModel>;
}

export const EXTERNAL_USER_CONTACT_REPOSITORY =
  "EXTERNAL_USER_CONTACT_REPOSITORY";
