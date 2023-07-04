import { FILE_REPOSITORY, FOLDER_REPOSITORY } from '@domain/repositories';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  GoFileApiCreateFolderAdapter,
  GoFileApiExcludeAdapter,
  GoFileApiUploadFileAdapter,
} from './api';
import { FileGoFileAndTypeOrmRepository } from './repositories/FileGoFileAndTypeOrm.repository';
import { FileEntity, FolderEntity } from './database/entities';
import { FolderGoFileAndTypeOrmRepository } from './repositories/FolderGoFileAndTypeOrm.repository';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: __dirname + '/../../.env',
    }),
    TypeOrmModule.forRoot({
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      type: 'mongodb',
      entities: [__dirname + '/database/entities/*.entity.{ts,js}'],
      useNewUrlParser: true,
      synchronize: true,
      logging: true,
      useUnifiedTopology: true,
      extra: {
        authSource: 'admin',
        ssl: false,
      },
    }),
    TypeOrmModule.forFeature([FileEntity, FolderEntity]),
  ],
  providers: [
    {
      provide: FILE_REPOSITORY,
      useClass: FileGoFileAndTypeOrmRepository,
    },
    {
      provide: FOLDER_REPOSITORY,
      useClass: FolderGoFileAndTypeOrmRepository,
    },
    GoFileApiUploadFileAdapter,
    GoFileApiCreateFolderAdapter,
    GoFileApiExcludeAdapter,
  ],
  exports: [FILE_REPOSITORY, FOLDER_REPOSITORY],
})
export class InfraModule {}
