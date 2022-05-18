import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DemoService } from 'src/modules/demo/demo.service';

@Controller('demo')
@ApiTags('demo')
export class DemoController {
  constructor(private demoService: DemoService) {}

  @Post()
  async create(): Promise<any> {
    return this.demoService.create();
  }

  @Get()
  async getAll(): Promise<any> {
    return this.demoService.getAll();
  }
}
