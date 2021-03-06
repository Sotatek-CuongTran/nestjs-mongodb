import { BullModule } from '@nestjs/bull';
import { CacheModule, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-redis-store';
import { ConsoleModule } from 'nestjs-console';
import { redisConfig } from 'src/configs/redis.config';
import { DATABASE_CONNECTION_NAME } from 'src/modules/database/database.constant';
import { DatabaseModule } from 'src/modules/database/database.module';
import { DatabaseService } from 'src/modules/database/database.service';
import { DemoModule } from 'src/modules/demo/demo.module';

const Modules = [
  Logger,
  ScheduleModule.forRoot(),
  ConsoleModule,
  BullModule.forRoot({
    redis: redisConfig,
  }),
  CacheModule.register({
    store: redisStore,
    ...redisConfig,
    isGlobal: true,
  }),
  MongooseModule.forRootAsync({
    connectionName: DATABASE_CONNECTION_NAME,
    inject: [DatabaseService],
    imports: [DatabaseModule],
    useFactory: (databaseService: DatabaseService) => databaseService.createMongooseOptions(),
  }),
  DatabaseModule,
  DemoModule,
];
export default Modules;
