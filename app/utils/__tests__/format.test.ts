import { formatDateString } from '../';

describe('formatDateString()', () => {
  test('property formats date to a locale date string.', () => {
    const dateString = '2022-01-08T07:00:00.000Z';
    expect(formatDateString(dateString)).toBe('1/8/2022');
  });
});
