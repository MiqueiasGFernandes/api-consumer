import { InternalUserModel } from '@domain/models';

export interface IGenerateCsvUseCase {
  generate(data: InternalUserModel[]): Promise<Buffer>;
}

export const GENERATE_CSV_USE_CASE = 'GENERATE_CSV_USE_CASE';
