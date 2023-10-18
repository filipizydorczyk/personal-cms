import { FileType, Page, Paginated } from './types';

/**
 * Takes list and turns it into paginated object
 * Pages starts with index 1
 * @param list to be paginated
 * @param pagination information how to divide list
 * @returns paginated object with necessery data
 */
export const paginated = <T>(list: T[], pagination: Page): Paginated<T> => {
  const { page, size } = pagination;
  const startIndex = (page - 1) * size;

  return {
    page,
    pages: Math.ceil(list.length / size),
    total: list.length,
    size,
    content: list.slice(startIndex, startIndex + size),
  };
};

/**
 * This functino will decode provided string
 * @param body string to decode
 * @returns `Buffer` if string is Buffer stringified by nestjs,
 * `JSON` if string is parsable JSON
 * and original value if string is neither JSON or Buffer
 */
export const decodeStringifiedBody = (body: string): unknown => {
  try {
    const jsonValue = JSON.parse(body);
    if (jsonValue.type === 'Buffer') {
      return Buffer.from(jsonValue);
    }
    return jsonValue;
  } catch (error) {
    return body;
  }
};

/**
 * This is very basic implementation of checking type of file inside of Buffer
 * objet
 * @param buffer Buffer object to check
 * @returns what type of file it is. Will return `undefined` if fucntion
 * doesnt konw this type
 */
export const getBufferFileType = (buffer: Buffer): FileType | undefined => {
  const hex = buffer.toString('hex', 0, 4);
  switch (hex) {
    case '89504e47':
      return 'image/png';
    case '47494638':
      return 'image/gif';
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
      return 'image/jpeg';
    default:
      return undefined;
  }
};
