import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ArticleController } from './controllers/article.controller';
import { ArticleRepository } from './repositories/article.repository';
import { MediaController } from './controllers/media.controller';
import { MediaRepository } from './repositories/media.repository';
import { ImageMiddleware } from './middlewares/image.middleware';
import { MarkdownService } from './services/markdown.service';
import { ConfigService } from './services/config.service';
import { ConfigRepository } from './repositories/config.repository';
import { GitService } from './services/git.service';
import { ArticleService } from './services/article.service';
import { MediaService } from './services/media.service';
import { SyncController } from './controllers/sync.controller';

@Module({
  imports: [],
  controllers: [ArticleController, MediaController, SyncController],
  providers: [
    ArticleService,
    MediaService,
    ConfigService,
    GitService,
    MarkdownService,
    ConfigRepository,
    ArticleRepository,
    MediaRepository,
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
