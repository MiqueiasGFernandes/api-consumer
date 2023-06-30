import { ExternalUserAddressModel } from "@domain/models";
import { IExternalUserAddresRepository } from "@domain/repositories";
import { HttpClientGetAdapter } from "@infra/http/client/HttpClientGet.adapter";
import { LinkApiAddressDto } from "./dtos/LinkApiAdress.dto";

export class LinkApiExternalUserAddressRepository
  implements IExternalUserAddresRepository
{
  constructor(private readonly httpClientGetAdapter: HttpClientGetAdapter) {}

  findBy(options: { userId: number }): Promise<ExternalUserAddressModel[]> {
    return this.httpClientGetAdapter.get<LinkApiAddressDto[]>(
      `/users/${options.userId}/address`
    );
  }
}
