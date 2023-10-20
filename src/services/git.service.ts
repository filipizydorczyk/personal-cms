import { Injectable } from '@nestjs/common';
import simpleGit, { SimpleGit } from 'simple-git';
import { ConfigService } from './config.service';
import { readdirSync } from 'fs';

@Injectable()
export class GitService {
  private git: SimpleGit;

  constructor(private readonly configService: ConfigService) {
    const contentDir = this.configService.get('content') as string;
    this.git = simpleGit(contentDir);
  }

  /**
   * Wrapper function on `clone` and `pull`.
   * If repository exists it will pull otherwise it will clone
   */
  update() {
    const contentDir = this.configService.get('content') as string;
    if (readdirSync(contentDir).length === 0) {
      this.clone();
    } else {
      this.pull();
    }
  }

  pull() {
    if (this.configService.get('git') !== null) {
      this.git.pull();
    }
  }

  clone() {
    const repo = this.configService.get('git');

    if (repo !== null) {
      this.git.clone(repo, '.');
    }
  }
}
