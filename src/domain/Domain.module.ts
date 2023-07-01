import { Global, Module } from "@nestjs/common";
import { SYNCHRONIZATION_USE_CASE } from "./use-cases";
import { RemoteSynchronizeUsersService } from "./services/RemoteSynchronizeUsers.service";
import { InfraModule } from "@infra/Infra.module";

@Global()
@Module({
  imports: [InfraModule],
  providers: [
    {
      provide: SYNCHRONIZATION_USE_CASE,
      useClass: RemoteSynchronizeUsersService,
    },
  ],
  exports: [SYNCHRONIZATION_USE_CASE],
})
export class DomainModule {}
