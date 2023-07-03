import { Module } from "@nestjs/common";
import { SynchronizeUserController } from "./http/controllers/SynchronizeUser.controller";
import { DomainModule } from "@domain/Domain.module";

@Module({
  imports: [DomainModule],
  controllers: [SynchronizeUserController],
})
export class PresentationModule {}
