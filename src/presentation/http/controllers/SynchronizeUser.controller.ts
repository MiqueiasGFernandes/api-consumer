import { Controller, HttpCode, Post } from "@nestjs/common";
import { HttpResponse } from "../types/HttpResponse.type";
import { ISynchronizeUsersUseCase } from "@domain/use-cases";
import { InternalUserDetailDto } from "@presentation/dto/InternalUserDetail.dto";

@Controller("synchronize")
export class SynchronizeUserController {
  constructor(private readonly synchronizeUseCase: ISynchronizeUsersUseCase) {}

  @Post()
  @HttpCode(201)
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
