import { InternalUserModel } from "@domain/models";
import { IInternalUserRepository } from "@domain/repositories";
import { Injectable } from "@nestjs/common";
import { InternalUserEntity } from "../entities";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmInternalUserRepository implements IInternalUserRepository {
  constructor(
    @InjectRepository(InternalUserEntity)
    private readonly usersDataMapper: Repository<InternalUserEntity>
  ) {}
  find(): Promise<InternalUserModel[]> {
    return this.usersDataMapper.find();
  }
  async save(internaUser: InternalUserModel): Promise<InternalUserModel> {
    return this.usersDataMapper.save({
      fullName: internaUser.fullName,
      email: internaUser.email,
      address: internaUser.address,
      addressNumber: internaUser.addressNumber,
      phoneNumber: internaUser.phoneNumber,
    });
  }
}
