import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';
import { DemoService } from 'src/modules/demo/demo.service';
import { ResponseDto } from 'src/shares/dtos/response.dto';

@Controller('demo')
@ApiTags('demo')
export class DemoController {
  constructor(private demoService: DemoService) {}

  @Post()
  async create(): Promise<ResponseDto<any>> {
    const res = await this.demoService.create();
    return {
      data: res,
      metadata: {},
    };
  }

  @Get()
  getAll(): Observable<ResponseDto<any>> {
    return this.demoService.getAll().pipe(
      map((e) => {
        return {
          data: e,
          metadata: {},
        };
      }),
    );
  }
}
