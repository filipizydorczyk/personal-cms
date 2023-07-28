import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { ArticleDTO, Page, Paginated } from './types';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  getArtciles(page: Page): Paginated<string> {
    return this.articleRepository.getArtciles(page);
  }

  getArtcileByName(name: string): ArticleDTO | null {
    const content = this.articleRepository.getArtcileByName(name);
    const metadata = this.articleRepository.getMetadataByName(name);

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
