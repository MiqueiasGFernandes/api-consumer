import { CommanderUtil } from "./Commander.uti";
import { ITestingDatabasePort } from "./TestingDatabase.port";

export class MongoTestingDatabaseAdapter implements ITestingDatabasePort {
  static isInited = false;

  initDatabase(): Promise<void> {
    const username = process.env.DATABASE_USER;
    const password = process.env.DATABASE_PASSWORD;
    const database = process.env.DATABASE_NAME;

    if (!MongoTestingDatabaseAdapter.isInited) {
      CommanderUtil.execute(
        `docker run --name test-mongo -e MONGO_INITDB_DATABASE=${database} -e MONGO_INITDB_ROOT_USERNAME=${username} -e MONGO_INITDB_ROOT_PASSWORD=${password} -d mongo`
      );

      MongoTestingDatabaseAdapter.isInited = true;
      return;
    }
  }

  closeDatabase(): Promise<void> {
    if (!MongoTestingDatabaseAdapter.isInited) {
      return CommanderUtil.execute(`docker stop $(docker ps -q)`);
    }
  }
}
