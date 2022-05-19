import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from 'src/modules/database/database.service';
import { DATABASE_CONNECTION_NAME } from 'src/modules/database/database.constant';
import { DemoModel } from 'src/schemas/demo.schema';

const models: ModelDefinition[] = [DemoModel];
@Global()
@Module({
  providers: [DatabaseService],
  exports: [MongooseModule, DatabaseService],
  imports: [MongooseModule.forFeature(models, DATABASE_CONNECTION_NAME)],
})
export class DatabaseModule {}
