import { ResourceNotFoundException } from '@domain/exceptions';
import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { FILE_REPOSITORY, IFileRepository } from '../../../domain/repositories';
import { RemoteRemoveFileService } from '../../../domain/services';
import { MockType } from '../fixtures';

describe('RemoteRemoveFileService', () => {
  let service: RemoteRemoveFileService;
  let folderRepositoryMock: MockType<IFileRepository>;
  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        RemoteRemoveFileService,
        {
          provide: FILE_REPOSITORY,
          useFactory: (): MockType<IFileRepository> => ({
            delete: jest.fn((data) => data),
            findOneBy: jest.fn((data) => data),
            save: jest.fn((data) => data),
          }),
        },
      ],
    }).compile();

    folderRepositoryMock = await testingModule.get(FILE_REPOSITORY);
    service = await testingModule.resolve(RemoteRemoveFileService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('GIVEN .remove()', () => {
    describe('WHEN success', () => {
      test('SHOULD removes file matching id', async () => {
        folderRepositoryMock.delete.mockResolvedValue({});
        folderRepositoryMock.findOneBy.mockResolvedValue({
          id: faker.string.uuid(),
        });

        const sut = service.remove(faker.string.alpha(), faker.string.alpha());

        await expect(sut).resolves.not.toThrow();
      });
    });
    describe('WHEN file does not exists', () => {
      test('SHOULD throws ResourceNotFoundException', async () => {
        folderRepositoryMock.delete.mockResolvedValue({});
        folderRepositoryMock.findOneBy.mockResolvedValue(null);

        const sut = service.remove(faker.string.alpha(), faker.string.alpha());

        await expect(sut).rejects.toThrow(ResourceNotFoundException);
      });
    });
  });
});
