export interface ISendCsvUseCase {
  send(csv: Buffer): Promise<string>;
}

export const SEND_CSV_USE_CASE = 'SEND_CSV_USE_CASE';
