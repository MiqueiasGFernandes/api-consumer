import { FolderModel } from '@domain/models';

export interface IAddFolderUseCase {
  add(folder: FolderModel): Promise<FolderModel>;
}

export const ADD_FOLDER_USE_CASE = 'ADD_FOLDER_USE_CASE';
