import { BadConversionException } from '@domain/exceptions';
import { InternalUserModel } from '@domain/models';
import { CSV_CONVERSOR_PORT, ICsvConversorPort } from '@domain/ports';
import { IGenerateCsvUseCase } from '@domain/use-cases';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GenerateCsvService implements IGenerateCsvUseCase {
  private readonly logger = new Logger('GenerateCsvService');

  constructor(
    @Inject(CSV_CONVERSOR_PORT)
    private readonly csvConversorPort: ICsvConversorPort,
  ) {}

  async generate(users: InternalUserModel[]): Promise<Buffer> {
    const csv: Buffer = await this.csvConversorPort
      .jsonToCsv(users)
      .catch((error) => {
        this.logger.error(error, error.stack);

        throw new BadConversionException(error);
      });

    return csv;
  }
}
