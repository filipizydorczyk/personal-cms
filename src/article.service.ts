import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { ArticleDTO, Paginated } from './types';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  getArtciles(): Paginated<string> {
    return this.articleRepository.getArtciles({ size: 15, page: 0 });
  }

  getArtcileByName(name: string): ArticleDTO | null {
    const content = this.articleRepository.getArtcileByName(name);

    if (typeof content === 'string') {
      return {
        name,
        content,
      };
    }

    return null;
  }
}
