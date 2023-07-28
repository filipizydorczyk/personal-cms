import { Injectable } from '@nestjs/common';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  getMediaByName(name: string): Buffer | null {
    return this.mediaRepository.getMediaByName(name);
  }
}
