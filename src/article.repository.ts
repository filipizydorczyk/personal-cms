import { readdirSync, existsSync, readFileSync } from 'fs';
import { extname, parse } from 'path';
import { Injectable } from '@nestjs/common';
import { Page, Paginated } from './types';
import { paginated } from './utils';

@Injectable()
export class ArticleRepository {
  getArtciles(pagination: Page): Paginated<string> {
    const files = readdirSync('./content')
      .filter((file) => extname(file) === '.md')
      .map((file) => parse(file).name);

    return paginated(files, pagination);
  }

  getArtcileByName(name: string): string | null {
    const file = `./content/${name}.md`;

    if (existsSync(file)) {
      return readFileSync(file, 'utf-8');
    }

    return null;
  }
}
