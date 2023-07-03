import { Module } from '@nestjs/common';
import { GENERATE_CSV_USE_CASE, SEND_CSV_USE_CASE } from './use-cases';
import { GenerateCsvService, RemoteSendCsvService } from './services';
import { InfraModule } from '@infra/Infra.module';

@Module({
  imports: [InfraModule],
  providers: [
    {
      provide: SEND_CSV_USE_CASE,
      useClass: RemoteSendCsvService,
    },
    {
      provide: GENERATE_CSV_USE_CASE,
      useClass: GenerateCsvService,
    },
  ],
  exports: [SEND_CSV_USE_CASE, GENERATE_CSV_USE_CASE],
})
export class DomainModule {}
