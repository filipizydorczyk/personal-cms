import { Injectable } from '@nestjs/common';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { ConfigService } from '../services/config.service';

const GLOBALS_EXTENSTION = 'globals.json';

@Injectable()
export class GlobalRepository {
  private contentDir: string;

  constructor(private readonly configService: ConfigService) {
    this.contentDir = this.configService.get('content');
  }

  getGlobals(): Record<string, unknown> {
    const files = readdirSync(this.contentDir).filter(
      (file) => file === GLOBALS_EXTENSTION || file.endsWith(`.${GLOBALS_EXTENSTION}`),
    );

    const result = files
      .map((file) => {
        const filePath = `${this.contentDir}/${file}`;
        if (existsSync(filePath)) {
          return JSON.parse(readFileSync(filePath, 'utf-8'));
        }

        return {};
      })
      .reduce((previousValue, currentValue) => {
        return { ...previousValue, ...currentValue };
      }, {});

    return result as Record<string, unknown>;
  }
}
