import { FileModel } from '../../../domain/models';
import {
  FILE_REPOSITORY,
  FOLDER_REPOSITORY,
  IFileRepository,
  IFolderRepository,
} from '../../../domain/repositories';
import { RemoteAddFileService } from '../../../domain/services';
import { MockType } from '../fixtures';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { ResourceNotFoundException } from '@domain/exceptions';

describe('RemoteAddFileService', () => {
  let service: RemoteAddFileService;
  let fileRepositoryMock: MockType<IFileRepository>;
  let folderRepositoryMock: MockType<IFolderRepository>;
  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        RemoteAddFileService,
        {
          provide: FILE_REPOSITORY,
          useFactory: (): MockType<IFileRepository> => ({
            save: jest.fn((data) => data),
          }),
        },
        {
          provide: FOLDER_REPOSITORY,
          useFactory: (): MockType<IFolderRepository> => ({
            findOneBy: jest.fn((data) => data),
          }),
        },
      ],
    }).compile();

    folderRepositoryMock = await testingModule.get(FOLDER_REPOSITORY);
    fileRepositoryMock = await testingModule.get(FILE_REPOSITORY);
    service = await testingModule.resolve(RemoteAddFileService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('GIVEN .add()', () => {
    describe('WHEN success', () => {
      test('SHOULD calls save with input data', async () => {
        const folderId = faker.string.uuid();

        fileRepositoryMock.save.mockResolvedValue({});
        folderRepositoryMock.findOneBy.mockResolvedValue({
          id: folderId,
        });

        const input: FileModel = {
          content: Buffer.from(''),
          targetFolder: faker.string.alpha(),
        };

        await service.add(input);
        expect(fileRepositoryMock.save).toHaveBeenCalledWith({
          content: input.content,
          targetFolder: input.targetFolder,
          folderId,
        });
      });
    });
    describe('WHEN informed folder does not exists', () => {
      test('SHOULD throw ResourceNotFoundException', async () => {
        fileRepositoryMock.save.mockResolvedValue({});
        folderRepositoryMock.findOneBy.mockResolvedValue(null);

        const input: FileModel = {
          content: Buffer.from(''),
          targetFolder: faker.string.alpha(),
        };

        const sut = service.add(input);
        await expect(sut).rejects.toThrow(ResourceNotFoundException);
      });
    });
  });
});
