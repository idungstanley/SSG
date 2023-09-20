export function convert24to12(time24: string | undefined) {
  if (time24) {
    const [hours, minutes] = time24.split(':');

    const hoursInt = parseInt(hours, 10);

    const ampm = hoursInt >= 12 ? 'PM' : 'AM';

    const hours12 = hoursInt % 12 === 0 ? 12 : hoursInt % 12;

    const time12 = `${hours12}:${minutes} ${ampm}`;

    return time12;
  } else return time24;
}

export function convert12to24(time12: string) {
  const [timePart, ampm] = time12.split(' ');
  const [hours, minutes] = timePart.split(':').map((part) => parseInt(part, 10));

  const isAM = ampm.toLowerCase() === 'am';

  let hours24 = hours;

  if (!isAM && hours !== 12) {
    hours24 += 12;
  } else if (isAM && hours === 12) {
    hours24 = 0;
  }
  const formattedHours = String(hours24).padStart(2, '0');
  const time24 = `${formattedHours}:${String(minutes).padStart(2, '0')}`;

  return time24;
}
