import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('/api/v1/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('/:name')
  getMediaByName(@Param('name') name: string): Buffer {
    const media = this.mediaService.getMediaByName(name);

    if (media === null) {
      throw new BadRequestException('Invalid media');
    }
    return media;
  }
}
