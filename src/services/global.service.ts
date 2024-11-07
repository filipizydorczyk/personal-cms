import { Injectable } from '@nestjs/common';
import { GlobalRepository } from 'src/repositories/global.repository';

@Injectable()
export class GlobalService {
  constructor(private readonly globalRepository: GlobalRepository) {}

  getAllGlobals() {
    return this.globalRepository.getGlobals();
  }

  getFeeds(): string[] {
    const feeds = this.globalRepository.getGlobals()['feeds'];

    if (Array.isArray(feeds)) {
      return feeds as string[];
    }

    return [];
  }
}
