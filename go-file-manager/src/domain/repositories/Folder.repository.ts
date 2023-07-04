import { FolderModel } from '@domain/models';

export interface IFolderRepository {
  save(folder: FolderModel): Promise<FolderModel>;
  findOneBy(where: {
    name: string;
    parentFolder: string;
  }): Promise<FolderModel>;
}

export const FOLDER_REPOSITORY = 'FOLDER_REPOSITORY';
