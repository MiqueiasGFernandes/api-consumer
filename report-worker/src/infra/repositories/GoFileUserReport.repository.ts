import { IUserReportRepository } from '@domain/repositories';
import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class GoFileUserReportRepository implements IUserReportRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async save(report: Buffer): Promise<{ link: string }> {
    const token = this.configService.getOrThrow('GO_FILE_API_TOKEN');

    const { server: serverData } = (
      await lastValueFrom(
        this.httpService
          .get(`https://api.gofile.io/getServer`)
          .pipe(map((data) => data)),
      ).catch((error) => {
        throw new InternalServerErrorException(error, {
          cause: error.response.data,
        });
      })
    ).data.data;

    const form = new FormData();

    form.append('token', token);
    form.append('file', report, { filename: 'report.csv' });

    const { data } = await lastValueFrom(
      this.httpService
        .post(`https://${serverData}.gofile.io/uploadFile`, form)
        .pipe(map((data) => data)),
    ).catch((error) => {
      throw new InternalServerErrorException(error.message, {
        cause: error,
      });
    });

    return { link: data.downloadPage };
  }
}
