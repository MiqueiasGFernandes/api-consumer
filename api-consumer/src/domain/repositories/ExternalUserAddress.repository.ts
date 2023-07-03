import { ExternalUserAddressModel } from "../models";

export interface IExternalUserAddresRepository {
  findBy(options: { userId: number }): Promise<ExternalUserAddressModel[]>;
}

export const EXTERNAL_USER_ADDRESS_REPOSITORY =
  "EXTERNAL_USER_ADDRESS_REPOSITORY";
