import { AuthenticationHeaderUtil } from "@infra/api/repositories/utils/AuthenticationHeader.uti";
import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { validate } from "class-validator";
import { lastValueFrom, map } from "rxjs";
import xmlParser from "xml2json";

@Injectable()
export class HttpClientGetAdapter {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly authenticationHeaderUtil: AuthenticationHeaderUtil
  ) {}

  async get<T, P, R>(
    path: string,
    options?: {
      xmlFieldName?: "text";
    }
  ): Promise<R> {
    const url = this.configService.getOrThrow("LINK_API_URL");

    const headers = this.authenticationHeaderUtil.get();

    const { data } = await lastValueFrom(
      this.httpService
        .get<T>(`${url}${path}`, {
          headers,
        })
        .pipe(map((data) => data))
    ).catch((error) => {
      throw new InternalServerErrorException(error.response.data, {
        cause: error.response.data,
      });
    });

    const responseFromXmlToJson: P = xmlParser.toJson(
      data[options.xmlFieldName],
      {
        object: true,
      }
    ) as any;

    await validate(responseFromXmlToJson as object).catch((errors) => {
      throw new InternalServerErrorException(
        `Error validating data from external API: `,
        errors
      );
    });

    return responseFromXmlToJson as unknown as R;
  }
}
