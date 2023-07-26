import { Page, Paginated } from './types';

/**
 * Takes list and turns it into paginated object
 * @param list to be paginated
 * @param pagination information how to divide list
 * @returns paginated object with necessery data
 */
export const paginated = <T>(list: T[], pagination: Page): Paginated<T> => {
  const { page, size } = pagination;
  const startIndex = page * size;

  return {
    page,
    pages: list.length % size,
    total: list.length,
    size,
    content: list.slice(startIndex, startIndex + size),
  };
};
