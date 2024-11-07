import { Injectable } from '@nestjs/common';
import { FeedRepository } from '../repositories/feed.repository';
import { FeedDTO, FeedShortDTO, Page, Paginated } from '../types';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}

  getFeedByCategory(category: string, page: Page): Paginated<FeedShortDTO> {
    const result = this.feedRepository.getFeedByCategory(category, page);
    return {
      ...result,
      content: result.content.map((article) => {
        const metadata = this.feedRepository.getMetadataByName(category, article);
        return { name: article, metadata };
      }),
    };
  }

  getFeedByName(category: string, name: string): FeedDTO | null {
    const content = this.feedRepository.getFeedByName(category, name);
    const metadata = this.feedRepository.getMetadataByName(category, name);

    if (typeof content === 'string') {
      return {
        name,
        content,
        metadata: metadata !== null ? metadata : {},
      };
    }

    return null;
  }
}
