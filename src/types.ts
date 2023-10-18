export type FileType = 'image/png' | 'image/gif' | 'image/jpeg';

export type Page = {
  page: number;
  size: number;
};

export type Paginated<T> = {
  page: number;
  pages: number;
  total: number;
  size: number;
  content: T[];
};

export type ArticleShortDTO = {
  name: string;
  metadata: Record<string, any>;
};

export type ArticleDTO = ArticleShortDTO & {
  content: string;
};

export type ConfigCMS = {
  git: string | null;
  content: string | null;
};
