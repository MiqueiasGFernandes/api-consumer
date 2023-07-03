import { CSV_CONVERSOR_PORT } from '@domain/ports';
import { Module } from '@nestjs/common';
import { JsonToCsvAdapter } from './adapters';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { USER_REPORT_REPOSITORY } from '@domain/repositories';
import { GoFileUserReportRepository } from './repositories';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: __dirname + '/../../.env',
    }),
  ],
  providers: [
    {
      provide: CSV_CONVERSOR_PORT,
      useClass: JsonToCsvAdapter,
    },
    {
      provide: USER_REPORT_REPOSITORY,
      useClass: GoFileUserReportRepository,
    },
  ],
  exports: [CSV_CONVERSOR_PORT, USER_REPORT_REPOSITORY],
})
export class InfraModule {}
