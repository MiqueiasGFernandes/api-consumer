import { InternalUserModel } from '@domain/models';

export interface IGenerateCsvUseCase {
  generate(data: InternalUserModel[]): Promise<Buffer>;
}
