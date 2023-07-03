import { InternalUserModel } from '@domain/models';
import {
  GENERATE_CSV_USE_CASE,
  IGenerateCsvUseCase,
  ISendCsvUseCase,
  SEND_CSV_USE_CASE,
} from '@domain/use-cases';
import { Controller, Inject, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class SendReportController {
  private readonly logger: Logger = new Logger();

  constructor(
    @Inject(GENERATE_CSV_USE_CASE)
    private readonly generateCsvService: IGenerateCsvUseCase,
    @Inject(SEND_CSV_USE_CASE)
    private readonly sendCsvUseCase: ISendCsvUseCase,
  ) {}

  @MessagePattern()
  async handle(@Ctx() context: RmqContext) {
    let message;
    try {
      message = JSON.parse(context.getMessage().content) as InternalUserModel[];
    } catch (e) {
      this.logger.error('json parse failed', context.getMessage().content);
      context.getChannelRef().nack(context.getMessage(), null, false);

      return;
    }

    let csv: Buffer;
    try {
      csv = await this.generateCsvService.generate(message);
    } catch (error) {
      context.getChannelRef().nack(context.getMessage(), null, false);
      return;
    }

    try {
      await this.sendCsvUseCase.send(csv as Buffer);

      this.logger.debug('File success sended');
      context.getChannelRef().ack(context.getMessage());
    } catch (error) {
      this.logger.error(error, error.stack);
      context.getChannelRef().nack(context.getMessage(), null, true);
      return;
    }
  }
}
