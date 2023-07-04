import { FileModel } from '@domain/models';

export interface IFileRepository {
  save(file: FileModel): Promise<FileModel>;
  delete(id: string): Promise<void>;
  findOneBy(where: { name: string; parentFolder: string }): Promise<FileModel>;
}

export const FILE_REPOSITORY = 'FILE_REPOSITORY';
