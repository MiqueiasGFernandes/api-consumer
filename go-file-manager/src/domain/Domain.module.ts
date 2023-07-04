import { InfraModule } from '@infra/Infra.module';
import { Module } from '@nestjs/common';
import {
  ADD_FILE_USE_CASE,
  ADD_FOLDER_USE_CASE,
  REMOVE_FILE_USE_CASE,
} from './use-cases';
import {
  RemoteAddFileService,
  RemoteAddFolderService,
  RemoteRemoveFileService,
} from './services';

@Module({
  imports: [InfraModule],
  providers: [
    {
      provide: ADD_FILE_USE_CASE,
      useClass: RemoteAddFileService,
    },
    {
      provide: ADD_FOLDER_USE_CASE,
      useClass: RemoteAddFolderService,
    },
    {
      provide: REMOVE_FILE_USE_CASE,
      useClass: RemoteRemoveFileService,
    },
  ],
  exports: [ADD_FILE_USE_CASE, ADD_FOLDER_USE_CASE, REMOVE_FILE_USE_CASE],
})
export class DomainModule {}
