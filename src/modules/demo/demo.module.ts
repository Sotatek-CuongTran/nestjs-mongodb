import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoController } from 'src/modules/demo/demo.controller';
import { DemoService } from 'src/modules/demo/demo.service';
import { Demo, DemoSchema } from 'src/schemas/demo.schema';
import { DATABASE_CONNECTION_NAME } from 'src/modules/database/database.constant';

@Module({
  imports: [MongooseModule.forFeature([{ name: Demo.name, schema: DemoSchema }], DATABASE_CONNECTION_NAME)],
  providers: [DemoService],
  controllers: [DemoController],
})
export class DemoModule {}
