import { DomainModule } from "@domain/Domain.module";
import { InfraModule } from "@infra/Infra.module";
import { Module } from "@nestjs/common";
import { PresentationModule } from "@presentation/Presentation.module";

@Module({
  imports: [InfraModule, PresentationModule, DomainModule],
})
export class BootstrapModule {}
