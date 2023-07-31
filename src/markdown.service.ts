import { Injectable } from '@nestjs/common';
import { Parser, HtmlRenderer } from 'commonmark';

@Injectable()
export class MarkdownService {
  private parser: Parser;
  private renderer: HtmlRenderer;

  constructor() {
    this.parser = new Parser();
    this.renderer = new HtmlRenderer();
  }

  parseToHtml(markdown: string): string {
    const parsed = this.parser.parse(markdown);
    return this.renderer.render(parsed);
  }
}
