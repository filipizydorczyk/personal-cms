import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ImageMiddleware } from './middlewares/image.middleware';

import { FeedRepository } from './repositories/feed.repository';
import { MediaRepository } from './repositories/media.repository';
import { ConfigRepository } from './repositories/config.repository';
import { GlobalRepository } from './repositories/global.repository';

import { MarkdownService } from './services/markdown.service';
import { ConfigService } from './services/config.service';
import { GitService } from './services/git.service';
import { FeedService } from './services/feed.service';
import { MediaService } from './services/media.service';
import { GlobalService } from './services/global.service';

import { MediaController } from './controllers/media.controller';
import { FeedController } from './controllers/feed.controller';
import { SyncController } from './controllers/sync.controller';
import { GlobalController } from './controllers/global.controller';

@Module({
  imports: [],
  controllers: [MediaController, SyncController, GlobalController, FeedController],
  providers: [
    FeedService,
    MediaService,
    ConfigService,
    GitService,
    GlobalService,
    MarkdownService,
    ConfigRepository,
    FeedRepository,
    MediaRepository,
    GlobalRepository,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ImageMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
