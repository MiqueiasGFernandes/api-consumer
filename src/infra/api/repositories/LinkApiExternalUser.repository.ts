import { ExternalUserModel } from "@domain/models";
import { IExternalUserRepository } from "@domain/repositories";
import { HttpClientGetAdapter } from "@infra/http/client/HttpClientGet.adapter";
import { Injectable } from "@nestjs/common";
import { LinkApiExternalUserDto } from "./dtos/LinkApiPaginatedUserItems.dto";

@Injectable()
export class LinkApiExternalUserRepository implements IExternalUserRepository {
  constructor(private readonly httpClientGetAdapter: HttpClientGetAdapter) {}

  async find(): Promise<ExternalUserModel[]> {
    return this.httpClientGetAdapter.get<LinkApiExternalUserDto[]>("/users");
  }
}
