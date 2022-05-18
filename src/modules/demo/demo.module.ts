import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoController } from 'src/modules/demo/demo.controller';
import { DemoService } from 'src/modules/demo/demo.service';
import { Demo, DemoSchema } from 'src/schemas/demo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Demo.name, schema: DemoSchema }])],
  providers: [DemoService],
  controllers: [DemoController],
})
export class DemoModule {}
