import { Injectable } from '@nestjs/common';
import { ConfigCMS } from '../types';
import { ConfigRepository } from '../repositories/config.repository';

@Injectable()
export class ConfigService {
  constructor(private readonly configRepository: ConfigRepository) {}

  get(setting: keyof ConfigCMS): string | null {
    return this.configRepository.getConfig()[setting];
  }

  set(setting: keyof ConfigCMS, value: string) {
    const conifg = { ...this.configRepository.getConfig() };
    conifg[setting] = value;
    this.configRepository.save(conifg);
  }
}
