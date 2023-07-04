import { NestFactory } from '@nestjs/core';
import { Bootstrap } from './bootstrap/Bootstrap.module';

async function bootstrap() {
  const app = await NestFactory.create(Bootstrap);
  await app.listen(3002);
}
bootstrap();
