import { ICsvConversorPort } from '@domain/ports';
import { parseAsync } from 'json2csv';

export class JsonToCsvAdapter implements ICsvConversorPort {
  async jsonToCsv<T>(data: T): Promise<Buffer> {
    const csvContent = await parseAsync(data);
    return Buffer.from(csvContent);
  }
}
