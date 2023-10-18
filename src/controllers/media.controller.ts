import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ContentService } from '../services/content.service';

@Controller('/api/v1/media')
export class MediaController {
  constructor(private readonly contentService: ContentService) {}

  @Get('/:name')
  getMediaByName(@Param('name') name: string): Buffer {
    const media = this.contentService.getMediaByName(name);

    if (media === null) {
      throw new BadRequestException('Invalid media');
    }
    return media;
  }
}
