import { NestFactory } from "@nestjs/core";
import { BootstrapModule } from "./bootstrap/Bootstrap.module";

async function bootstrap() {
  const app = await NestFactory.create(BootstrapModule);
  await app.listen(3000);
}
bootstrap();
