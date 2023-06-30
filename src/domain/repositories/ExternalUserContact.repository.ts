import { ExternalUserContactModel } from "../models";

export interface IExternalUserContactRepository {
  findBy(options: { userId: number }): Promise<ExternalUserContactModel[]>;
}

export const EXTERNAL_USER_CONTACT_REPOSITORY =
  "EXTERNAL_USER_CONTACT_REPOSITORY";
