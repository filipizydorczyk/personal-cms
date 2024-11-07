import { Controller, Get } from '@nestjs/common';
import { GlobalService } from 'src/services/global.service';

@Controller('/api/v1/globals')
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  @Get('/')
  getGlobals(): Record<string, unknown> {
    return this.globalService.getAllGlobals();
  }
}
