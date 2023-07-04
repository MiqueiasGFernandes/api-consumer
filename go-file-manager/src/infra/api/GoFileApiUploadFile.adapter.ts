import * as FormData from 'form-data';
import { FileModel } from '@domain/models';
import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

export class GoFileApiUploadFileAdapter {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async upload(file: FileModel): Promise<any> {
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
    form.append('file', file.content, { filename: file.name });
    form.append('folderId', file.targetFolder);

    const response = (
      await lastValueFrom(
        this.httpService
          .post(`https://${serverData}.gofile.io/uploadFile`, form)
          .pipe(map((data) => data)),
      ).catch((error) => {
        throw new InternalServerErrorException(error.message, {
          cause: error,
        });
      })
    ).data.data;

    return response;
  }
}
