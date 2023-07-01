import request from "supertest";
import { BootstrapModule } from "@bootstrap/Bootstrap.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ITestingDatabasePort } from "./fixtures/scripts/TestingDatabase.port";
import { TestingDatabaseFactory } from "./fixtures/scripts/TestingDatabaseFactory";

describe("Synchronization", () => {
  let app: INestApplication;
  let database: ITestingDatabasePort;

  beforeAll(async () => {
    database = TestingDatabaseFactory.makeTestingDatabase();

    await database.initDatabase();

    const testingModule = await Test.createTestingModule({
      imports: [BootstrapModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await database.closeDatabase();
    await app.close();
  });
  test("[POST] /synchronize", async () => {
    return request(app.getHttpServer()).post("/synchronize").expect(201);
  });
});
