import { Module } from '@nestjs/common';
import { FileController } from './http/controllers/File.controller';
import { DomainModule } from '@domain/Domain.module';

@Module({
  controllers: [FileController],
  imports: [DomainModule],
})
export class PresentationModule {}
