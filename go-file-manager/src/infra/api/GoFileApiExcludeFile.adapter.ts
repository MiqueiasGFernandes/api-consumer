import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class GoFileApiExcludeAdapter {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async delete(contentId: string): Promise<void> {
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

    await lastValueFrom(
      this.httpService
        .put(
          `https://${serverData}.gofile.io/deleteContent`,
          {
            contendsId: contentId,
            token,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(map((data) => data)),
    ).catch((error) => {
      throw new InternalServerErrorException(error.message, {
        cause: error,
      });
    });
  }
}
