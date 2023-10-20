import { Controller, Patch } from '@nestjs/common';
import { GitService } from 'src/services/git.service';

@Controller('/api/v1/sync')
export class SyncController {
  constructor(private readonly gitService: GitService) {}

  @Patch('/')
  syncContent() {
    this.gitService.update();
  }
}
