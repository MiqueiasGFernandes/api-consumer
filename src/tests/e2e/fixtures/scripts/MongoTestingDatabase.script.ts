import { CommanderUtil } from "./Commander.uti";
import { ITestingDatabasePort } from "./TestingDatabase.port";

export class MongoTestingDatabaseAdapter implements ITestingDatabasePort {
  initDatabase(): Promise<void> {
    const username = process.env.DATABASE_USER;
    const password = process.env.DATABASE_PASSWORD;
    const database = process.env.DATABASE_NAME;

    return CommanderUtil.execute(
      `docker run --name test-mongo -e MONGO_INITDB_DATABASE=${database} MONGO_INITDB_ROOT_USERNAME=${username} MONGO_INITDB_ROOT_PASSWORD=${password} -d mongo`
    );
  }

  closeDatabase(): Promise<void> {
    return CommanderUtil.execute(`docker stop $(docker ps -q)`);
  }
}
