import { Injectable, Logger } from '@nestjs/common';
import simpleGit, { SimpleGit } from 'simple-git';
import { ConfigService } from './config.service';
import { readdirSync, existsSync } from 'fs';

@Injectable()
export class GitService {
  private static readonly LOG = new Logger(GitService.name);

  private git: SimpleGit | undefined;

  constructor(private readonly configService: ConfigService) {
    const contentDir = this.configService.get('content') as string;
    if (existsSync(contentDir)) {
      this.git = simpleGit(contentDir);
    } else {
      GitService.LOG.warn(
        'Couldnt create simpleGit. Content directory doesnt exist',
      );
    }
  }

  /**
   * Wrapper function on `clone` and `pull`.
   * If repository exists it will pull otherwise it will clone
   */
  update() {
    const contentDir = this.configService.get('content') as string;
    if (this.git && readdirSync(contentDir).length === 0) {
      GitService.LOG.log('Repository doesnt exist yet. Clonning...');
      this.clone();
    } else {
      GitService.LOG.log('Pulling changes from reporitory...');
      this.pull();
    }
  }

  pull() {
    if (this.git && this.configService.get('git') !== null) {
      this.git.pull();
    } else {
      GitService.LOG.warn('Changes couldnt be pulled. Git config doesnt exist');
    }
  }

  clone() {
    const repo = this.configService.get('git');

    if (this.git && repo !== null) {
      this.git.clone(repo, '.');
    } else {
      GitService.LOG.warn('Repo couldnt be cloned. Git config doesnt exist');
    }
  }
}
