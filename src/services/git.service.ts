import { Injectable } from '@nestjs/common';
import simpleGit, { SimpleGit } from 'simple-git';
import { ConfigService } from './config.service';

@Injectable()
export class GitService {
  private git: SimpleGit;

  constructor(private readonly configService: ConfigService) {
    const contentDir = this.configService.get('content') as string;
    this.git = simpleGit(contentDir);
  }

  pull() {
    if (this.configService.get('git') !== null) {
      this.git.pull();
    }
  }

  clone() {
    const repo = this.configService.get('git');

    if (repo !== null) {
      this.git.clone(repo);
    }
  }
}
