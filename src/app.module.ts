import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from './article.repository';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';
import { MediaService } from './media.service';
import { ImageMiddleware } from './image.middleware';

@Module({
  imports: [],
  controllers: [ArticleController, MediaController],
  providers: [ArticleService, MediaService, ArticleRepository, MediaRepository],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ImageMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
