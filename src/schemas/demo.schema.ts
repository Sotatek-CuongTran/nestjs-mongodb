import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DemoDocument = Demo & Document;

@Schema()
export class Demo {
  @Prop()
  name: string;

  @Prop()
  hobbies: string[];

  @Prop()
  age: number;
}

export const DemoSchema = SchemaFactory.createForClass(Demo);
