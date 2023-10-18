import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../repositories/article.repository';
import { ArticleDTO, ArticleShortDTO, Page, Paginated } from '../types';
import { MediaRepository } from '../repositories/media.repository';

@Injectable()
export class ContentService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly mediaRepository: MediaRepository,
  ) {}

  getArtciles(page: Page): Paginated<ArticleShortDTO> {
    const result = this.articleRepository.getArtciles(page);
    return {
      ...result,
      content: result.content.map((article) => {
        const metadata = this.articleRepository.getMetadataByName(article);
        return { name: article, metadata };
      }),
    };
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

  getMediaByName(name: string): Buffer | null {
    return this.mediaRepository.getMediaByName(name);
  }
}
