import { FolderModel } from '@domain/models';
import { IFolderRepository } from '@domain/repositories';
import { GoFileApiCreateFolderAdapter } from '@infra/api';
import { FolderEntity } from '@infra/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class FolderGoFileAndTypeOrmRepository implements IFolderRepository {
  constructor(
    @InjectRepository(FolderEntity)
    private readonly folderDataMapper: Repository<FolderEntity>,
    private readonly goFileApiCreateAdapter: GoFileApiCreateFolderAdapter,
  ) {}
  async findOneBy(where: { name: string }): Promise<FolderModel> {
    const folderEntity = await this.folderDataMapper.findOneBy({
      name: where.name,
    });

    return {
      name: folderEntity.name,
      parentFolder: folderEntity.parentFolder,
      id: folderEntity.id,
    };
  }

  async save(folder: FolderModel): Promise<FolderModel> {
    await this.goFileApiCreateAdapter.create(folder);

    const folderEntity = await this.folderDataMapper.save(folder);

    return {
      id: folderEntity.id,
      ...folder,
    };
  }
}
