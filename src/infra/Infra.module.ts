import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LinkApiExternalUserRepository } from "./api/repositories";
import { TypeOrmInternalUserRepository } from "./database/repositories";
import { HttpClientGetAdapter } from "./http/client/HttpClientGet.adapter";
import {
  EXTERNAL_USER_REPOSITORY,
  INTERNAL_USER_REPOSITORY,
} from "@domain/repositories";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: __dirname + "/../../config/app",
    }),
    HttpModule,
    TypeOrmModule.forRoot({
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      type: "mongodb",
      entities: [__dirname + "/database/entities/*.entity.{ts|js}"],
    }),
    TypeOrmModule.forFeature([TypeOrmInternalUserRepository]),
  ],
  providers: [
    {
      provide: EXTERNAL_USER_REPOSITORY,
      useClass: LinkApiExternalUserRepository,
    },
    {
      provide: INTERNAL_USER_REPOSITORY,
      useClass: TypeOrmInternalUserRepository,
    },
    HttpClientGetAdapter,
  ],
})
export class InfraModule {}
