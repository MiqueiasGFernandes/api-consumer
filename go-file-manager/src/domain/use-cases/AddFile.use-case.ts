import { FileModel } from '@domain/models';

export interface IAddFileUseCase {
  add(file: FileModel): Promise<FileModel>;
}

export const ADD_FILE_USE_CASE = 'ADD_FILE_USE_CASE';
