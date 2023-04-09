import { DateTime } from 'luxon';

export const formatLocalTime = (date: Date): string =>
  DateTime.fromJSDate(date).toFormat('MMMM d y, hh:mm a');
