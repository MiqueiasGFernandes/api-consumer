import { ItemAlreadyExistsException } from '@domain/exceptions';
import { FolderModel } from '@domain/models';
import { FOLDER_REPOSITORY, IFolderRepository } from '@domain/repositories';
import { IAddFolderUseCase } from '@domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RemoteAddFolderService implements IAddFolderUseCase {
  constructor(
    @Inject(FOLDER_REPOSITORY)
    private readonly folderRepository: IFolderRepository,
  ) {}

  async add(folder: FolderModel): Promise<FolderModel> {
    const folderFromDatabase = await this.folderRepository.findOneBy({
      name: folder.name,
      parentFolder: folder.parentFolder,
    });

    if (
      folderFromDatabase &&
      folderFromDatabase.parentFolder === folder.parentFolder
    ) {
      throw new ItemAlreadyExistsException(
        `Folder with name ${folder.name} already exists in the target`,
      );
    }

    return this.folderRepository.save(folder);
  }
}
