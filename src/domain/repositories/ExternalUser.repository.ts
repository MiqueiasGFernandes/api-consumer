import { ExternalUserModel } from "../models";

export interface IExternalUserRepository {
  find(): Promise<ExternalUserModel[]>;
}

export const EXTERNAL_USER_REPOSITORY = "EXTERNAL_USER_REPOSITORY";
