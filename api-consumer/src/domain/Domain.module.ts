import { InfraModule } from "@infra/Infra.module";
import { Module } from "@nestjs/common";
import { RemoteSynchronizeUsersService } from "./services/RemoteSynchronizeUsers.service";
import { SYNCHRONIZATION_USE_CASE } from "./use-cases";

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
