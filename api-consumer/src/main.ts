import { NestFactory } from "@nestjs/core";
import { BootstrapModule } from "./bootstrap";
import { HttpExceptionFilter } from "@presentation/http/filters/HttpException.filter";

async function bootstrap() {
  const app = await NestFactory.create(BootstrapModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
