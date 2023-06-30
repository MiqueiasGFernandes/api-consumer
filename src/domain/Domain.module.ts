import { Global, Module } from "@nestjs/common";
import { SYNCHRONIZATION_USE_CASE } from "./use-cases";
import { RemoteSynchronizeUsersService } from "./services/RemoteSynchronizeUsers.service";

@Global()
@Module({
  providers: [
    {
      provide: SYNCHRONIZATION_USE_CASE,
      useClass: RemoteSynchronizeUsersService,
    },
  ],
  exports: [RemoteSynchronizeUsersService],
})
export class DomainModule {}
