import { InternalUserModel } from '@domain/models';
import { CSV_CONVERSOR_PORT, ICsvConversorPort } from '@domain/ports';
import { GenerateCsvService } from '@domain/services';
import { Test } from '@nestjs/testing';
import { MockType } from '@tests/fixtures';
import { faker } from '@faker-js/faker';
import { BadConversionException } from '@domain/exceptions';

describe('GenerateCsvService', () => {
  let service: GenerateCsvService;
  let csvConversorPortMock: MockType<ICsvConversorPort>;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        GenerateCsvService,
        {
          provide: CSV_CONVERSOR_PORT,
          useFactory: (): MockType<ICsvConversorPort> => ({
            jsonToCsv: jest.fn((data) => data),
          }),
        },
      ],
    }).compile();

    csvConversorPortMock = await testingModule.get(CSV_CONVERSOR_PORT);
    service = await testingModule.resolve(GenerateCsvService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GIVEN .generate()', () => {
    test('WHEN successfully. SHOULD returns csv buffer', async () => {
      csvConversorPortMock.jsonToCsv.mockResolvedValue(Buffer.from('foo'));
      const users: InternalUserModel[] = [
        {
          addressNumber: Number(faker.location.buildingNumber()),
          address: faker.location.street(),
          email: faker.internet.email(),
          fullName: faker.person.fullName(),
          phoneNumber: faker.phone.number(),
          id: faker.string.uuid(),
        },
        {
          addressNumber: Number(faker.location.buildingNumber()),
          address: faker.location.street(),
          email: faker.internet.email(),
          fullName: faker.person.fullName(),
          phoneNumber: faker.phone.number(),
          id: faker.string.uuid(),
        },
      ];

      const sut = await service.generate(users);
      expect(sut).toBeInstanceOf(Buffer);
    });
    test('WHEN conversion fails. SHOULD throws BadConversionException', async () => {
      csvConversorPortMock.jsonToCsv.mockRejectedValue({});
      const users: InternalUserModel[] = [
        {
          addressNumber: Number(faker.location.buildingNumber()),
          address: faker.location.street(),
          email: faker.internet.email(),
          fullName: faker.person.fullName(),
          phoneNumber: faker.phone.number(),
          id: faker.string.uuid(),
        },
        {
          addressNumber: Number(faker.location.buildingNumber()),
          address: faker.location.street(),
          email: faker.internet.email(),
          fullName: faker.person.fullName(),
          phoneNumber: faker.phone.number(),
          id: faker.string.uuid(),
        },
      ];

      const sut = service.generate(users);
      await expect(sut).rejects.toThrow(BadConversionException);
    });
  });
});
