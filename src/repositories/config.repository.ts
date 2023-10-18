import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { ConfigCMS } from '../types';

const DEFAULT_CONFIG: ConfigCMS = {
  git: null,
  content: '/var/content',
};

@Injectable()
export class ConfigRepository {
  getConfig(): ConfigCMS | undefined {
    const path = process.env.CONFIG;

    if (!path || !existsSync(path)) {
      return DEFAULT_CONFIG;
    }

    const config = JSON.parse(readFileSync(path, 'utf-8'));
    const final: ConfigCMS = { ...DEFAULT_CONFIG, ...config };

    return final;
  }

  save(config: ConfigCMS) {
    if (process.env.CONFIG) {
      writeFileSync(process.env.CONFIG, JSON.stringify(config), 'utf8');
    }
  }
}
