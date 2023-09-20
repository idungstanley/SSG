import dayjs from 'dayjs';

export function handleConversion(format: string, time?: string) {
  const parsedTime = dayjs(`1970-01-01T${time}`);
  const formattedTime = parsedTime.format(format);

  return formattedTime;
}
