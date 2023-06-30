import { InternalUserModel } from "../models";

export interface IInternalUserRepository {
  find(): Promise<InternalUserModel[]>;
  save(internaUser: InternalUserModel): Promise<InternalUserModel[]>;
}

export const INTERNAL_USER_REPOSITORY = "INTERNAL_USER_REPOSITORY";
