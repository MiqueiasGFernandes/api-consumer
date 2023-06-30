import { Module } from "@nestjs/common";
import { SynchronizeUserController } from "./http/controllers/SynchronizeUser.controller";

@Module({
  controllers: [SynchronizeUserController],
})
export class PresentationModule {}
