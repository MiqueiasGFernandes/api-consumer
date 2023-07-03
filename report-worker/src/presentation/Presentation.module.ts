import { Module } from '@nestjs/common';
import { SendReportController } from './controllers/SendReport.controller';
import { DomainModule } from '@domain/Domain.module';

@Module({
  imports: [DomainModule],
  controllers: [SendReportController],
})
export class PresentationModule {}
