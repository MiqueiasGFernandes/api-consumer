import { ExternalUserContactModel } from "@domain/models";
import { IExternalUserContactRepository } from "@domain/repositories";
import { HttpClientGetAdapter } from "@infra/http/client/HttpClientGet.adapter";
import { Injectable } from "@nestjs/common";
import { LinkApiContactDto } from "./dtos/LinkApiContact.dto";

@Injectable()
export class LinkApiExternalUserContactRepository
  implements IExternalUserContactRepository
{
  constructor(private readonly httpClientGetAdapter: HttpClientGetAdapter) {}

  findBy(options: { userId: number }): Promise<ExternalUserContactModel[]> {
    return this.httpClientGetAdapter.get<LinkApiContactDto[]>(
      `/users/${options.userId}/contacts`
    );
  }
}
