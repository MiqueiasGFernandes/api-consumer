import { BootstrapModule } from '@bootstrap/Bootstrap.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BootstrapModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_URI],
        queue: process.env.RABBIT_QUEUE,
        queueOptions: {
          durable: true,
        },
        noAck: false,
        prefetchCount: 1,
      },
    },
  );

  await app.listen();
}
bootstrap();
