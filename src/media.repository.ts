import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';

@Injectable()
export class MediaRepository {
  private mediaDir: string;

  constructor() {
    this.mediaDir = `${process.env.CONTENT_DIR || './content'}/media`;
  }

  getMediaByName(name: string): Buffer | null {
    const file = `${this.mediaDir}/${name}`;

    if (existsSync(file)) {
      return readFileSync(file);
    }

    return null;
  }
}
