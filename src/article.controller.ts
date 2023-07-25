import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticlesDTO } from './types';

@Controller('/api/v1/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/')
  async getArticles(): Promise<ArticlesDTO> {
    const articles = await this.articleService.getArtciles();
    return articles;
  }
}
