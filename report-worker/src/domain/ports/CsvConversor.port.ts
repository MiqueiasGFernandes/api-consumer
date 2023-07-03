export interface ICsvConversorPort {
  jsonToCsv<T>(data: T): Promise<Buffer>;
}

export const CSV_CONVERSOR_PORT = 'CSV_CONVERSOR_PORT';
