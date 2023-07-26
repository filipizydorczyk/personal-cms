import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDTO, Paginated } from './types';

@Controller('/api/v1/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/')
  getArticles(): Paginated<string> {
    const articles = this.articleService.getArtciles();
    return articles;
  }

  @Get('/:name')
  getArticle(@Param('name') name: string): ArticleDTO {
    const article = this.articleService.getArtcileByName(name);

    if (article === null) {
      throw new BadRequestException('Invalid article');
    }
    return article;
  }
}
