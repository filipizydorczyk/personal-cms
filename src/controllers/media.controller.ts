import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { MediaService } from 'src/services/media.service';

@Controller('/api/v1/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('/:name')
  async getMediaByName(@Param('name') name: string, @Query('w') width, @Query('h') height): Promise<Buffer> {
    const media = await this.mediaService.getMediaByName(name, {
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
    });

    if (media === null) {
      throw new BadRequestException('Invalid media');
    }
    return media;
  }
}
