export interface IRemoveFileUseCase {
  remove(fileName: string, fileFolderName: string): Promise<void>;
}

export const REMOVE_FILE_USE_CASE = 'REMOVE_FILE_USE_CASE';
