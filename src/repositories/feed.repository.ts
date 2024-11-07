import { readdirSync, existsSync, readFileSync } from 'fs';
import { extname, parse } from 'path';
import { Injectable } from '@nestjs/common';
import { Page, Paginated } from '../types';
import { paginated } from '../utils';
import { ConfigService } from '../services/config.service';

@Injectable()
export class FeedRepository {
  constructor(private readonly configService: ConfigService) {}

  getFeedByCategory(category: string, pagination: Page): Paginated<string> {
    const contentDir = `${this.configService.get('content')}/${category}`;
    const files = readdirSync(contentDir)
      .filter((file) => extname(file) === '.md')
      .map((file) => parse(file).name);

    return paginated(files, pagination);
  }

  getFeedByName(category: string, name: string): string | null {
    const contentDir = `${this.configService.get('content')}/${category}`;
    const file = `${contentDir}/${name}.md`;

    if (existsSync(file)) {
      return readFileSync(file, 'utf-8');
    }

    return null;
  }

  getMetadataByName(category: string, name: string): Record<string, any> | null {
    const contentDir = `${this.configService.get('content')}/${category}`;
    const file = `${contentDir}/${name}.json`;

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
