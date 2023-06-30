import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthenticationHeaderUtil {
  private readonly configService: ConfigService;

  get(): { Authorization: string } {
    const username = this.configService.getOrThrow("LINK_API_USERNAME");
    const password = this.configService.getOrThrow("LINK_API_PASSWORD");

    const headers = {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
        "base64"
      )}`,
    };

    return headers;
  }
}
