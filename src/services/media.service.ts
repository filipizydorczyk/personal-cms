import { Injectable, Logger } from '@nestjs/common';
import sharp from 'sharp';
import { MediaRepository } from 'src/repositories/media.repository';
import { ImageResizeOptions } from 'src/types';

@Injectable()
export class MediaService {
  private static readonly LOG = new Logger(MediaService.name);

  constructor(private readonly mediaRepository: MediaRepository) {}

  async getMediaByName(name: string, options?: ImageResizeOptions): Promise<Buffer | null> {
    if (!options || (!options.width && !options.height)) {
      return this.mediaRepository.getMediaByName(name);
    }

    MediaService.LOG.log('Looking for resized version of image in cache');
    const resizedFile = this.mediaRepository.getResizedMediaByName(name, options);

    if (resizedFile) {
      MediaService.LOG.log('Returning resized version of image from cache');
      return resizedFile;
    }

    MediaService.LOG.log('Resized version of image is missing from cache. Caching the image');
    const newFile = await this.resizeOriginalFile(name, options);

    if (newFile) {
      this.mediaRepository.saveResziedMedia(name, newFile, options);
    }

    return newFile;
  }

  private async resizeOriginalFile(name: string, { width, height }: ImageResizeOptions): Promise<Buffer | null> {
    if (!width && !height) {
      return null;
    }

    const originalFile = this.mediaRepository.getMediaByName(name);

    if (originalFile === null) {
      return null;
    }

    return sharp(originalFile).resize(width, height).toBuffer();
  }
}
