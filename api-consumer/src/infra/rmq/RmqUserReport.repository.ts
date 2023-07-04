import { InternalUserModel } from "@domain/models";
import { IUserReportRepository } from "@domain/repositories";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { connect } from "amqplib";

@Injectable()
export class RmqUserReportRepository implements IUserReportRepository {
  constructor(private readonly configService: ConfigService) {}

  async save(users: InternalUserModel[]): Promise<InternalUserModel[]> {
    const queue: string = this.configService.getOrThrow(
      "RABBIT_USER_REPORTS_QUEUE"
    );
    const url: string = this.configService.getOrThrow(
      "RABBIT_USER_REPORTS_URL"
    );

    const connection = await connect(url);
    const channel = await connection.createChannel();

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(users)));

    return users;
  }
}
