import {
  ISynchronizeUsersUseCase,
  SYNCHRONIZATION_USE_CASE,
} from "@domain/use-cases";
import { Controller, Inject, Post } from "@nestjs/common";
import { InternalUserDetailDto } from "@presentation/dto/InternalUserDetail.dto";
import { HttpResponse } from "../types/HttpResponse.type";

@Controller()
export class SynchronizeUserController {
  constructor(
    @Inject(SYNCHRONIZATION_USE_CASE)
    private readonly synchronizeUseCase: ISynchronizeUsersUseCase
  ) {}

  @Post("/synchronize")
  async synchronize(): Promise<HttpResponse<InternalUserDetailDto[]>> {
    const newUsers = await this.synchronizeUseCase.synchronize();

    const data = newUsers.map((newUser) => {
      const internalUserDetailDto = new InternalUserDetailDto();

      internalUserDetailDto.id = newUser.id;
      internalUserDetailDto.address = newUser.address;
      internalUserDetailDto.addressNumber = newUser.addressNumber;
      internalUserDetailDto.email = newUser.email;
      internalUserDetailDto.fullName = newUser.fullName;
      internalUserDetailDto.phoneNumber = newUser.phoneNumber;

      return internalUserDetailDto;
    });

    return {
      success: true,
      data,
    };
  }
}
