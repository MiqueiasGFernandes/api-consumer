import { Inject, Injectable } from '@nestjs/common';
import { FileModel } from '@domain/models';
import { FILE_REPOSITORY, IFileRepository } from '@domain/repositories';
import { IAddFileUseCase } from '@domain/use-cases';

@Injectable()
export class RemoteAddFileService implements IAddFileUseCase {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: IFileRepository,
  ) {}

  async add(file: FileModel): Promise<FileModel> {
    return this.fileRepository.save(file);
  }
}
