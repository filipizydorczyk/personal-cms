import { readdirSync } from 'fs';
import { extname, parse } from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  async getArtciles(): Promise<string[]> {
    const files = readdirSync('./content');
    return files
      .filter((file) => extname(file) === '.md')
      .map((file) => parse(file).name);
  }
}
