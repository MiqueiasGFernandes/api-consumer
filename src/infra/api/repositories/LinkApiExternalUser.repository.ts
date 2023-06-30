import { ExternalUserModel } from "@domain/models";
import { IExternalUserRepository } from "@domain/repositories";
import { HttpClientGetAdapter } from "@infra/http/client/HttpClientGet.adapter";
import { Injectable } from "@nestjs/common";
import {
  LinkApiDataDto,
  LinkApiExternalUserDto,
  LinkApiPaginatedItemsDto,
} from "./dtos/LinkApiPaginatedItems.dto";

@Injectable()
export class LinkApiExternalUserRepository implements IExternalUserRepository {
  constructor(private readonly httpClientGetAdapter: HttpClientGetAdapter) {}

  async find(): Promise<ExternalUserModel[]> {
    const response = await this.httpClientGetAdapter.get<
      LinkApiPaginatedItemsDto,
      LinkApiDataDto,
      LinkApiExternalUserDto[]
    >("/users");

    return response;
  }
}
