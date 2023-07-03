import { ReportUploadException } from '@domain/exceptions';
import {
  IUserReportRepository,
  USER_REPORT_REPOSITORY,
} from '@domain/repositories';
import { RemoteSendCsvService } from '@domain/services';
import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { MockType } from '@tests/fixtures';

describe('RemoteSendCsvService', () => {
  let service: RemoteSendCsvService;
  let userReportRepository: MockType<IUserReportRepository>;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        RemoteSendCsvService,
        {
          provide: USER_REPORT_REPOSITORY,
          useFactory: (): MockType<IUserReportRepository> => ({
            save: jest.fn((data) => data),
          }),
        },
      ],
    }).compile();

    userReportRepository = await testingModule.get(USER_REPORT_REPOSITORY);
    service = await testingModule.resolve(RemoteSendCsvService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GIVEN .generate()', () => {
    test('WHEN successfully. SHOULD returns csv buffer', async () => {
      userReportRepository.save.mockResolvedValue({
        link: faker.internet.url(),
      });

      const sut = await service.send(Buffer.from(''));
      expect(typeof sut).toBe('string');
    });
    test('WHEN conversion fails. SHOULD throws ReportUploadException', async () => {
      userReportRepository.save.mockRejectedValue({});

      const sut = service.send(Buffer.from(''));
      await expect(sut).rejects.toThrow(ReportUploadException);
    });
  });
});
