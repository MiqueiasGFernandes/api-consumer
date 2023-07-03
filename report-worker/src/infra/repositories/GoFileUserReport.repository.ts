import { IUserReportRepository } from '@domain/repositories';
import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

export class GoFileUserReportRepository implements IUserReportRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async save(report: Buffer): Promise<{ link: string }> {
    const token = this.configService.getOrThrow('GO_FILE_API_TOKEN');

    const { data: serverData } = await lastValueFrom(
      this.httpService
        .get(`https://api.gofile.io/getServer`)
        .pipe(map((data) => data)),
    ).catch((error) => {
      throw new InternalServerErrorException(error.response.data, {
        cause: error.response.data,
      });
    });

    const form = new FormData();

    form.append('token', token);
    form.append('file', new Blob([report]));

    const { data } = await lastValueFrom(
      this.httpService
        .post(`${serverData.server}.gofile.io/uploadFile`, form)
        .pipe(map((data) => data)),
    ).catch((error) => {
      throw new InternalServerErrorException(error.response.data, {
        cause: error.response.data,
      });
    });

    return data.downloadPage;
  }
}
