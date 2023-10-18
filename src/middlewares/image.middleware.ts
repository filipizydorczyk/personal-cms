import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { decodeStringifiedBody, getBufferFileType } from '../utils';

@Injectable()
export class ImageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const originalSend = res.send;

    res.send = (body?: any) => {
      const realValue = decodeStringifiedBody(body);
      if (realValue instanceof Buffer) {
        const bufferType = getBufferFileType(realValue);
        if (bufferType) {
          res.setHeader('Content-Type', bufferType);
          return originalSend.call(res, realValue);
        }
      }

      return originalSend.call(res, body);
    };

    next();
  }
}
