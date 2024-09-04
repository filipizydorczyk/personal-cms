import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { MediaService } from 'src/services/media.service';

@Controller('/api/v1/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('/:name')
  getMediaByName(@Param('name') name: string, @Query('w') width, @Query('h') height): Buffer {
    const media = this.mediaService.getMediaByName(name, { width: Number(width), height: Number(height) });

    if (media === null) {
      throw new BadRequestException('Invalid media');
    }
    return media;
  }
}
