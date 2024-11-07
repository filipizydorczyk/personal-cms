import { BadRequestException, Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { FeedDTO, FeedShortDTO, Paginated } from '../types';
import { DEFAULT_PAGE_SIZE } from '../contants';
import { MarkdownService } from '../services/markdown.service';
import { FeedService } from 'src/services/feed.service';
import { GlobalService } from 'src/services/global.service';

@Controller('/api/v1/feed')
export class FeedController {
  private static readonly LOG = new Logger(FeedController.name);

  constructor(
    private readonly feedService: FeedService,
    private readonly markdownService: MarkdownService,
    private readonly globalService: GlobalService,
  ) {}

  @Get('/:feed')
  getArticles(@Param('feed') feed: string, @Query('page') page: string): Paginated<FeedShortDTO> {
    if (!this.validateFeed(feed)) {
      throw new BadRequestException('Invalid fedd');
    }

    const articles = this.feedService.getFeedByCategory(feed, {
      size: DEFAULT_PAGE_SIZE,
      page: Number(page) || 1,
    });
    return articles;
  }

  @Get('/:feed/:name')
  getArticle(@Param('feed') feed: string, @Param('name') name: string): FeedDTO {
    if (!this.validateFeed(feed)) {
      throw new BadRequestException('Invalid fedd');
    }

    const article = this.feedService.getFeedByName(feed, name);
    if (article === null) {
      throw new BadRequestException('Invalid fedd');
    }
    return {
      ...article,
      content: this.markdownService.parseToHtml(article.content),
    };
  }

  private validateFeed(feed: string) {
    const configuredFeeds = this.globalService.getFeeds();

    if (configuredFeeds.length === 0) {
      FeedController.LOG.warn('You have no feed configured. Make sure to provide your feeds in your globals');
      return false;
    }

    if (!configuredFeeds.includes(feed)) {
      FeedController.LOG.warn(`Feed "${feed}" does not exist. Make sure you configured your feeds in your globals`);
      return false;
    }

    return true;
  }
}
