import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { ConfigService } from '../services/config.service';

@Injectable()
export class MediaRepository {
  private mediaDir: string;

  constructor(private readonly configService: ConfigService) {
    this.mediaDir = `${this.configService.get('content')}/media`;
  }

  getMediaByName(name: string): Buffer | null {
    const file = `${this.mediaDir}/${name}`;

    if (existsSync(file)) {
      return readFileSync(file);
    }

    return null;
  }
}
