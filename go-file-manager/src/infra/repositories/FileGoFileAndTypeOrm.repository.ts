import { FileModel } from '@domain/models';
import { IFileRepository } from '@domain/repositories';
import {
  GoFileApiExcludeAdapter,
  GoFileApiUploadFileAdapter,
} from '@infra/api';
import { FileEntity } from '@infra/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class FileGoFileAndTypeOrmRepository implements IFileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileDataMapper: Repository<FileEntity>,
    private readonly goFileApiUploadFileAdapter: GoFileApiUploadFileAdapter,
    private readonly goFileApiExcludeFileAdapter: GoFileApiExcludeAdapter,
  ) {}

  async save(file: FileModel): Promise<FileModel> {
    const response = await this.goFileApiUploadFileAdapter.upload(file);

    return this.fileDataMapper.save({ ...file, fileId: response.fileId });
  }
  async delete(id: string): Promise<void> {
    const fileEntity = await this.fileDataMapper.findOneBy({
      id,
    });

    await this.goFileApiExcludeFileAdapter.delete(fileEntity.e2eId);

    await this.fileDataMapper.delete(id);
  }
  async findOneBy(where: {
    name: string;
    parentFolder: string;
  }): Promise<FileModel> {
    const fileEntity = await this.fileDataMapper.findOneBy({
      name: where.name,
      targetFolder: where.parentFolder,
    });

    return {
      name: fileEntity.name,
      folderId: fileEntity.folderId,
      targetFolder: where.parentFolder,
    };
  }
}
