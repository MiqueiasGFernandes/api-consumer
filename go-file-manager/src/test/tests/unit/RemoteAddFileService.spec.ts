import { FileModel } from '../../../domain/models';
import { FILE_REPOSITORY, IFileRepository } from '../../../domain/repositories';
import { RemoteAddFileService } from '../../../domain/services';
import { MockType } from '../fixtures';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

describe('RemoteAddFileService', () => {
  let service: RemoteAddFileService;
  let fileRepositoryMock: MockType<IFileRepository>;
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
      ],
    }).compile();

    fileRepositoryMock = await testingModule.get(FILE_REPOSITORY);
    service = await testingModule.resolve(RemoteAddFileService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('GIVEN .add()', () => {
    describe('WHEN success', () => {
      test('SHOULD calls save with input data', async () => {
        fileRepositoryMock.save.mockResolvedValue({});

        const input: FileModel = {
          content: Buffer.from(''),
          targetFolder: faker.string.alpha(),
        };

        await service.add(input);
        expect(fileRepositoryMock.save).toHaveBeenCalledWith({
          content: input.content,
          targetFolder: input.targetFolder,
        });
      });
    });
  });
});
