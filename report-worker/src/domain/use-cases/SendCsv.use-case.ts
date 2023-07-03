export interface ISendCsvUseCase {
  send(csv: Buffer): Promise<string>;
}
