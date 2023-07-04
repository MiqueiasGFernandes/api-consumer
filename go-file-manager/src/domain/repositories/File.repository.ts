import { FileModel } from '@domain/models';

export interface IFileRepository {
  save(file: FileModel): Promise<FileModel>;
}

export const FILE_REPOSITORY = 'FILE_REPOSITORY';
