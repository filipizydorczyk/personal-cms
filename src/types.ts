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

export type ArticleDTO = {
  name: string;
  content: string;
  metadata?: unknown;
};
