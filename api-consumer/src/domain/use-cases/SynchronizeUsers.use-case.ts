import { InternalUserModel } from "../models/InternalUser.model";

export interface ISynchronizeUsersUseCase {
  synchronize(): Promise<InternalUserModel[]>;
}

export const SYNCHRONIZATION_USE_CASE = "SYNCHRONIZATION_USE_CASE";
