import { Injectable, Logger } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { parse } from 'path';
import { ImageResizeOptions } from 'src/types';
import { ConfigService } from '../services/config.service';

@Injectable()
export class MediaRepository {
  private static readonly LOG = new Logger(MediaRepository.name);

  private mediaDir: string;
  private geneartedContentDir: string;

  constructor(private readonly configService: ConfigService) {
    this.mediaDir = `${this.configService.get('content')}/media`;
    this.geneartedContentDir = this.configService.get('geneartedcontentdir');

    if (!existsSync(this.geneartedContentDir)) {
      MediaRepository.LOG.warn(`Creating ${this.geneartedContentDir} since directory doesn't exist yet.`);
      mkdirSync(this.geneartedContentDir);
    }
  }

  getResizedMediaByName(name: string, options: ImageResizeOptions): Buffer | null {
    const resizedFile = this.getResziedFilePath(name, options);

    if (existsSync(resizedFile)) {
      return readFileSync(resizedFile);
    }

    return null;
  }

  saveResziedMedia(name: string, buffer: Buffer, options: ImageResizeOptions) {
    const resizedFile = this.getResziedFilePath(name, options);

    if (!resizedFile) {
      return null;
    }

    writeFileSync(resizedFile, buffer);
    return buffer;
  }

  getMediaByName(name: string): Buffer | null {
    const file = `${this.mediaDir}/${name}`;

    if (existsSync(file)) {
      return readFileSync(file);
    }

    return null;
  }

  private getResziedFilePath(filename: string, { width, height }: ImageResizeOptions): string {
    const { ext, name } = parse(filename);
    const widthIndentifier = width ? `-w${width}` : undefined;
    const heightIndentifier = height ? `-h${height}` : undefined;

    if (!width && !height) {
      return null;
    }

    return `${this.geneartedContentDir}/${name}${widthIndentifier || ''}${heightIndentifier || ''}${ext}`;
  }
}
