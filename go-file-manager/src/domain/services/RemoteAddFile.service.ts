import { Inject, Injectable } from '@nestjs/common';
import { FileModel } from '@domain/models';
import {
  FILE_REPOSITORY,
  FOLDER_REPOSITORY,
  IFileRepository,
  IFolderRepository,
} from '@domain/repositories';
import { IAddFileUseCase } from '@domain/use-cases';
import { ResourceNotFoundException } from '@domain/exceptions';

@Injectable()
export class RemoteAddFileService implements IAddFileUseCase {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: IFileRepository,
    @Inject(FOLDER_REPOSITORY)
    private readonly folderRepository: IFolderRepository,
  ) {}

  async add(file: FileModel): Promise<FileModel> {
    const folder = await this.folderRepository.findOneBy({
      name: file.targetFolder,
    });

    if (!folder) {
      throw new ResourceNotFoundException(
        `Resource with matching information does not exists`,
      );
    }

    return this.fileRepository.save({
      ...file,
      folderId: folder.id,
    });
  }
}
