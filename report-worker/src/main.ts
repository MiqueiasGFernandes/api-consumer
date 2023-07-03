import { BootstrapModule } from '@bootstrap/Bootstrap.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BootstrapModule,
    {
      transport: Transport.RMQ,
      options: {
        noAck: false,
        urls: [process.env.RABBIT_URI],
        queue: process.env.RABBIT_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
