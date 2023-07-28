import { readdirSync, existsSync, readFileSync } from 'fs';
import { extname, parse } from 'path';
import { Injectable } from '@nestjs/common';
import { Page, Paginated } from './types';
import { paginated } from './utils';

@Injectable()
export class ArticleRepository {
  private contentDir: string;

  constructor() {
    this.contentDir = `${process.env.CONTENT_DIR || './content'}/articles`;
  }

  getArtciles(pagination: Page): Paginated<string> {
    const files = readdirSync(this.contentDir)
      .filter((file) => extname(file) === '.md')
      .map((file) => parse(file).name);

    return paginated(files, pagination);
  }

  getArtcileByName(name: string): string | null {
    const file = `${this.contentDir}/${name}.md`;

    if (existsSync(file)) {
      return readFileSync(file, 'utf-8');
    }

    return null;
  }

  getMetadataByName(name: string): Record<string, any> | null {
    const file = `${this.contentDir}/${name}.json`;

    if (existsSync(file)) {
      const value = readFileSync(file, 'utf-8');

      try {
        return JSON.parse(value);
      } catch (error) {
        return null;
      }
    }

    return null;
  }
}
