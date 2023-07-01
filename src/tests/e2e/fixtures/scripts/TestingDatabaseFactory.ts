import { MongoTestingDatabaseAdapter } from "./MongoTestingDatabase.script";
import { ITestingDatabasePort } from "./TestingDatabase.port";

export class TestingDatabaseFactory {
  static makeTestingDatabase(): ITestingDatabasePort {
    return new MongoTestingDatabaseAdapter();
  }
}
