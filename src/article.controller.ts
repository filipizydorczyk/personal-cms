import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDTO, Paginated } from './types';
import { DEFAULT_PAGE_SIZE } from './contants';
import { MarkdownService } from './markdown.service';

@Controller('/api/v1/articles')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly markdownService: MarkdownService,
  ) {}

  @Get('/')
  getArticles(@Query('page') page: string): Paginated<string> {
    const articles = this.articleService.getArtciles({
      size: DEFAULT_PAGE_SIZE,
      page: Number(page) || 0,
    });
    return articles;
  }

  @Get('/:name')
  getArticle(@Param('name') name: string): ArticleDTO {
    const article = this.articleService.getArtcileByName(name);

    if (article === null) {
      throw new BadRequestException('Invalid article');
    }
    return {
      ...article,
      content: this.markdownService.parseToHtml(article.content),
    };
  }
}
