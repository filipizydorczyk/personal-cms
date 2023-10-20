import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../repositories/article.repository';
import { ArticleDTO, ArticleShortDTO, Page, Paginated } from '../types';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

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
}
