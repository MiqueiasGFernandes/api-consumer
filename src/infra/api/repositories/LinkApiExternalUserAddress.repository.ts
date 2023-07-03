import { ExternalUserAddressModel } from "@domain/models";
import { IExternalUserAddresRepository } from "@domain/repositories";
import { HttpClientGetAdapter } from "@infra/http/client/HttpClientGet.adapter";
import { LinkApiAddressDto } from "./dtos/LinkApiAdress.dto";
import { Injectable } from "@nestjs/common";
import { LinkApiItemResponse } from "./dtos/LinkApiPaginatedUserItems.dto";

@Injectable()
export class LinkApiExternalUserAddressRepository
  implements IExternalUserAddresRepository
{
  constructor(private readonly httpClientGetAdapter: HttpClientGetAdapter) {}

  async findBy(options: {
    userId: number;
  }): Promise<ExternalUserAddressModel[]> {
    return (
      await this.httpClientGetAdapter.get<
        LinkApiItemResponse<LinkApiAddressDto[]>
      >(`/users/${options.userId}/address`)
    ).item;
  }
}
