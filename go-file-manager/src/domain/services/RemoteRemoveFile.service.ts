import { ResourceNotFoundException } from '@domain/exceptions';
import { FILE_REPOSITORY, IFileRepository } from '@domain/repositories';
import { IRemoveFileUseCase } from '@domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RemoteRemoveFileService implements IRemoveFileUseCase {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: IFileRepository,
  ) {}

  async remove(fileName: string, fileFolderName: string): Promise<void> {
    const file = await this.fileRepository.findOneBy({
      name: fileName,
      parentFolder: fileFolderName,
    });

    if (!file) {
      throw new ResourceNotFoundException(
        `Resource with matching information does not exists`,
      );
    }

    await this.fileRepository.delete(file.id);
  }
}
