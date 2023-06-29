import { NestFactory } from "@nestjs/core";
import { BootstrapModule } from "./bootstrap";

async function bootstrap() {
  const app = await NestFactory.create(BootstrapModule);
  await app.listen(3000);
}
bootstrap();
