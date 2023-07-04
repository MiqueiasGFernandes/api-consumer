import { ItemAlreadyExistsException } from '@domain/exceptions';
import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { FolderModel } from '../../../domain/models';
import {
  FOLDER_REPOSITORY,
  IFolderRepository,
} from '../../../domain/repositories';
import { RemoteAddFolderService } from '../../../domain/services';
import { MockType } from '../fixtures';

describe('RemoteAddFolderService', () => {
  let service: RemoteAddFolderService;
  let folderRepositoryMock: MockType<IFolderRepository>;
  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        RemoteAddFolderService,
        {
          provide: FOLDER_REPOSITORY,
          useFactory: (): MockType<IFolderRepository> => ({
            save: jest.fn((data) => data),
            findOneBy: jest.fn((data) => data),
          }),
        },
      ],
    }).compile();

    folderRepositoryMock = await testingModule.get(FOLDER_REPOSITORY);
    service = await testingModule.resolve(RemoteAddFolderService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('GIVEN .add()', () => {
    describe('WHEN success', () => {
      test('SHOULD calls save with input data', async () => {
        folderRepositoryMock.save.mockResolvedValue({});
        folderRepositoryMock.findOneBy.mockResolvedValue(null);

        const input: FolderModel = {
          name: faker.string.alpha(),
          parentFolder: faker.string.alpha(),
        };

        await service.add(input);

        expect(folderRepositoryMock.save).toHaveBeenCalledWith({
          name: input.name,
          parentFolder: input.parentFolder,
        });
      });
    });
    describe('WHEN folder already exists', () => {
      test('SHOULD throws ItemAlreadyExistsException', async () => {
        folderRepositoryMock.save.mockResolvedValue({});
        folderRepositoryMock.findOneBy.mockResolvedValue({});

        const input: FolderModel = {
          name: faker.string.alpha(),
          parentFolder: faker.string.alpha(),
        };

        const sut = service.add(input);

        await expect(sut).rejects.toThrow(ItemAlreadyExistsException);
      });
    });
  });
});
