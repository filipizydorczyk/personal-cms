import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ContentService } from '../services/content.service';
import { ArticleDTO, ArticleShortDTO, Paginated } from '../types';
import { DEFAULT_PAGE_SIZE } from '../contants';
import { MarkdownService } from '../services/markdown.service';

@Controller('/api/v1/articles')
export class ArticleController {
  constructor(
    private readonly contentService: ContentService,
    private readonly markdownService: MarkdownService,
  ) {}

  @Get('/')
  getArticles(@Query('page') page: string): Paginated<ArticleShortDTO> {
    const articles = this.contentService.getArtciles({
      size: DEFAULT_PAGE_SIZE,
      page: Number(page) || 1,
    });
    return articles;
  }

  @Get('/:name')
  getArticle(@Param('name') name: string): ArticleDTO {
    const article = this.contentService.getArtcileByName(name);

    if (article === null) {
      throw new BadRequestException('Invalid article');
    }
    return {
      ...article,
      content: this.markdownService.parseToHtml(article.content),
    };
  }
}
