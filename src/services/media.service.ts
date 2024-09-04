import { Injectable } from '@nestjs/common';
import { MediaRepository } from 'src/repositories/media.repository';
import { ImageResizeOptions } from 'src/types';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  getMediaByName(name: string, options?: ImageResizeOptions): Buffer | null {
    console.log(options);
    return this.mediaRepository.getMediaByName(name);
  }
}
