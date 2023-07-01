export interface ITestingDatabasePort {
  initDatabase(): Promise<void>;
  closeDatabase(): Promise<void>;
}
