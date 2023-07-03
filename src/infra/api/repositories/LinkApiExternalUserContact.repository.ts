import { ExternalUserContactModel } from "@domain/models";
import { IExternalUserContactRepository } from "@domain/repositories";
import { HttpClientGetAdapter } from "@infra/http/client/HttpClientGet.adapter";
import { Injectable } from "@nestjs/common";
import { LinkApiContactDto } from "./dtos/LinkApiContact.dto";
import { LinkApiItemResponse } from "./dtos/LinkApiPaginatedUserItems.dto";

@Injectable()
export class LinkApiExternalUserContactRepository
  implements IExternalUserContactRepository
{
  constructor(private readonly httpClientGetAdapter: HttpClientGetAdapter) {}

  async findOneBy(options: {
    userId: number;
  }): Promise<ExternalUserContactModel> {
    return (
      await this.httpClientGetAdapter.get<
        LinkApiItemResponse<LinkApiContactDto>
      >(`/users/${options.userId}/contacts`)
    ).item;
  }
}
