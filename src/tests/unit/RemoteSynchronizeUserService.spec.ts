import {
  EXTERNAL_USER_ADDRESS_REPOSITORY,
  EXTERNAL_USER_CONTACT_REPOSITORY,
  EXTERNAL_USER_REPOSITORY,
  IExternalUserAddresRepository,
  IExternalUserContactRepository,
  IExternalUserRepository,
  IInternalUserRepository,
  INTERNAL_USER_REPOSITORY,
} from "@domain/repositories";
import { Test } from "@nestjs/testing";
import { MockType } from "@tests/fixtures";
import { RemoteSynchronizeUsersService } from "@domain/services/RemoteSynchronizeUsers.service";
import {
  ExternalUserAddressModel,
  ExternalUserModel,
  ExternalUserContactModel,
} from "@domain/models";
import { faker } from "@faker-js/faker";
import { InternalServerErrorException } from "@nestjs/common";

describe("RemoteSynchronizeUserService", () => {
  let service: RemoteSynchronizeUsersService;
  let externalUserRepositoryMock: MockType<IExternalUserRepository>;
  let externalUserAddressRepositoryMock: MockType<IExternalUserAddresRepository>;
  let externalUserContactRepositoryMock: MockType<IExternalUserContactRepository>;
  let internalUserRepositoryMock: MockType<IInternalUserRepository>;
  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        RemoteSynchronizeUsersService,
        {
          provide: EXTERNAL_USER_REPOSITORY,
          useFactory: (): MockType<IExternalUserRepository> => ({
            find: jest.fn((data) => data),
          }),
        },
        {
          provide: EXTERNAL_USER_ADDRESS_REPOSITORY,
          useFactory: (): MockType<IExternalUserAddresRepository> => ({
            findBy: jest.fn((data) => data),
          }),
        },
        {
          provide: EXTERNAL_USER_CONTACT_REPOSITORY,
          useFactory: (): MockType<IExternalUserContactRepository> => ({
            findBy: jest.fn((data) => data),
          }),
        },
        {
          provide: INTERNAL_USER_REPOSITORY,
          useFactory: (): MockType<IInternalUserRepository> => ({
            find: jest.fn((data) => data),
            save: jest.fn((data) => data),
          }),
        },
      ],
    }).compile();

    externalUserRepositoryMock = await testingModule.get(
      EXTERNAL_USER_REPOSITORY
    );
    externalUserAddressRepositoryMock = await testingModule.get(
      EXTERNAL_USER_ADDRESS_REPOSITORY
    );
    externalUserContactRepositoryMock = await testingModule.get(
      EXTERNAL_USER_CONTACT_REPOSITORY
    );
    internalUserRepositoryMock = await testingModule.get(
      INTERNAL_USER_REPOSITORY
    );
    service = await testingModule.resolve(RemoteSynchronizeUsersService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("GIVEN .synchronize()", () => {
    describe("WHEN success synchronize external users into internal storage", () => {
      test("SHOULD returns synchronization list from database", async () => {
        const internalUsersFindMockData = [];

        const externalUsersMockData: ExternalUserModel[] = [
          {
            id: faker.number.int(),
            avatar: faker.internet.url(),
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
          },
          {
            id: faker.number.int(),
            avatar: faker.internet.url(),
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
          },
        ];

        const externalUserAddressMockData: ExternalUserAddressModel[] = [
          {
            id: faker.number.int(),
            city: faker.location.city(),
            country: faker.location.country(),
            countryCode: faker.location.countryCode(),
            number: Number(faker.location.buildingNumber()),
            street: faker.location.street(),
            userId: faker.number.int(),
            zipcode: faker.location.zipCode(),
          },
          {
            id: faker.number.int(),
            city: faker.location.city(),
            country: faker.location.country(),
            countryCode: faker.location.countryCode(),
            number: Number(faker.location.buildingNumber()),
            street: faker.location.street(),
            userId: faker.number.int(),
            zipcode: faker.location.zipCode(),
          },
        ];

        const externalUserContactsMockData: ExternalUserContactModel[] = [
          {
            id: faker.number.int(),
            email: faker.internet.email(),
            name: faker.person.firstName(),
            phoneNumber: faker.phone.number(),
            userId: faker.number.int(),
          },
          {
            id: faker.number.int(),
            email: faker.internet.email(),
            name: faker.person.firstName(),
            phoneNumber: faker.phone.number(),
            userId: faker.number.int(),
          },
        ];

        externalUserRepositoryMock.find.mockResolvedValue(
          externalUsersMockData
        );
        externalUserAddressRepositoryMock.findBy.mockImplementation((user) => ({
          ...externalUserAddressMockData,
          userId: user.id,
        }));
        externalUserContactRepositoryMock.findBy.mockImplementation((user) => ({
          ...externalUserContactsMockData,
          userId: user.id,
        }));
        internalUserRepositoryMock.save.mockImplementation((user) => {
          const record = {
            id: faker.string.uuid(),
            ...user,
          };

          internalUsersFindMockData.push(record);
        });
        internalUserRepositoryMock.find.mockResolvedValue(
          internalUsersFindMockData
        );

        const sut = await service.synchronize();
        expect(sut[0]).toHaveProperty("id");
        expect(sut[0]).toHaveProperty(
          "fullName",
          `${externalUsersMockData[0].firstName} ${externalUsersMockData[0].lastName}`
        );
        expect(sut[0]).toHaveProperty("email", externalUsersMockData[0].email);
        expect(sut[0]).toHaveProperty(
          "address",
          externalUserAddressMockData[0].street
        );
        expect(sut[0]).toHaveProperty(
          "addressNumber",
          externalUserAddressMockData[0].number
        );
        expect(sut[0]).toHaveProperty(
          "phoneNumber",
          externalUserContactsMockData[0].phoneNumber
        );
        expect(sut[1]).toHaveProperty("id");
        expect(sut[1]).toHaveProperty(
          "fullName",
          `${externalUsersMockData[1].firstName} ${externalUsersMockData[1].lastName}`
        );
        expect(sut[0]).toHaveProperty("email", externalUsersMockData[0].email);
        expect(sut[0]).toHaveProperty(
          "address",
          externalUserAddressMockData[0].street
        );
        expect(sut[1]).toHaveProperty(
          "addressNumber",
          externalUserAddressMockData[0].number
        );
        expect(sut[0]).toHaveProperty(
          "phoneNumber",
          externalUserContactsMockData[0].phoneNumber
        );
        expect(externalUserRepositoryMock.find).toHaveBeenCalled();
        expect(internalUserRepositoryMock.save).toHaveBeenCalledTimes(2);
      });
    });
    describe("WHEN some was wrong during any subprocess", () => {
      test("SHOULD stop execution and throw InternalServerErrorException", async () => {
        const internalUsersFindMockData = [];

        const externalUserAddressMockData: ExternalUserAddressModel[] = [
          {
            id: faker.number.int(),
            city: faker.location.city(),
            country: faker.location.country(),
            countryCode: faker.location.countryCode(),
            number: Number(faker.location.buildingNumber()),
            street: faker.location.street(),
            userId: faker.number.int(),
            zipcode: faker.location.zipCode(),
          },
          {
            id: faker.number.int(),
            city: faker.location.city(),
            country: faker.location.country(),
            countryCode: faker.location.countryCode(),
            number: Number(faker.location.buildingNumber()),
            street: faker.location.street(),
            userId: faker.number.int(),
            zipcode: faker.location.zipCode(),
          },
        ];

        const externalUserContactsMockData: ExternalUserContactModel[] = [
          {
            id: faker.number.int(),
            email: faker.internet.email(),
            name: faker.person.firstName(),
            phoneNumber: faker.phone.number(),
            userId: faker.number.int(),
          },
          {
            id: faker.number.int(),
            email: faker.internet.email(),
            name: faker.person.firstName(),
            phoneNumber: faker.phone.number(),
            userId: faker.number.int(),
          },
        ];

        externalUserRepositoryMock.find.mockResolvedValue(
          externalUserAddressMockData
        );
        externalUserAddressRepositoryMock.findBy.mockRejectedValue({});
        externalUserContactRepositoryMock.findBy.mockImplementation((user) => ({
          ...externalUserContactsMockData,
          userId: user.id,
        }));
        internalUserRepositoryMock.save.mockImplementation((user) => {
          const record = {
            id: faker.string.uuid(),
            ...user,
          };

          internalUsersFindMockData.push(record);
        });
        internalUserRepositoryMock.find.mockResolvedValue(
          internalUsersFindMockData
        );

        const sut = service.synchronize();
        await expect(sut).rejects.toThrow(InternalServerErrorException);
      });
    });
  });
});
