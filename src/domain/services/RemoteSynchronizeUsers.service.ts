import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InternalUserModel } from "../models";
import {
  EXTERNAL_USER_ADDRESS_REPOSITORY,
  EXTERNAL_USER_CONTACT_REPOSITORY,
  EXTERNAL_USER_REPOSITORY,
  IExternalUserAddresRepository,
  IExternalUserContactRepository,
  IExternalUserRepository,
  IInternalUserRepository,
  INTERNAL_USER_REPOSITORY,
} from "../repositories";
import { ISynchronizeUsersUseCase } from "../use-cases";

@Injectable()
export class RemoteSynchronizeUsersService implements ISynchronizeUsersUseCase {
  private readonly logger = new Logger(RemoteSynchronizeUsersService.name);

  constructor(
    @Inject(EXTERNAL_USER_REPOSITORY)
    private readonly externalUserRepository: IExternalUserRepository,
    @Inject(EXTERNAL_USER_ADDRESS_REPOSITORY)
    private readonly externalUserAddressRepository: IExternalUserAddresRepository,
    @Inject(EXTERNAL_USER_CONTACT_REPOSITORY)
    private readonly externalUserContactRepository: IExternalUserContactRepository,
    @Inject(INTERNAL_USER_REPOSITORY)
    private readonly internalUserRepository: IInternalUserRepository
  ) {}

  async synchronize(): Promise<InternalUserModel[]> {
    const externalUsers = await this.externalUserRepository.find();

    const internalUserCreationSubprocesses = externalUsers.map(
      async (externalUser) => {
        const externalUserAddresses =
          await this.externalUserAddressRepository.findBy({
            userId: externalUser.id,
          });
        const externaUserContacts =
          await this.externalUserContactRepository.findOneBy({
            userId: externalUser.id,
          });

        const internalUser = new InternalUserModel();

        internalUser.fullName = `${externalUser.firstName} ${externalUser.lastName}`;
        internalUser.email = externalUser.email;
        internalUser.address = externalUserAddresses[0].street;
        internalUser.addressNumber = externalUserAddresses[0].number;
        internalUser.phoneNumber = externaUserContacts.phoneNumber;

        return this.internalUserRepository.save(internalUser);
      }
    );

    await Promise.all(internalUserCreationSubprocesses).catch((error) => {
      this.logger.error(error, error.stack);

      throw new InternalServerErrorException(error);
    });

    const internalUsers = await this.internalUserRepository.find();
    return internalUsers;
  }
}
