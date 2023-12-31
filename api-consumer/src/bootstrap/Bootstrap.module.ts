import { Module } from "@nestjs/common";
import { PresentationModule } from "@presentation/Presentation.module";

@Module({
  imports: [PresentationModule],
})
export class BootstrapModule {}
