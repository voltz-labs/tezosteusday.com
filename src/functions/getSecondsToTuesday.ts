import { getDay } from "date-fns";
import { getNextDayOfWeek } from "./getNextDayOfWeek";
import { getSecondsBetween } from "./getSecondsBetween";

export const getSecondsToTuesday = () => {
  const now = Date.now();

  const offset = new Date().getTimezoneOffset() * 60 * 1000;

  const isTuesday = getDay(now + offset) === 2;

  if (isTuesday) {
    return 0;
  }

  return getSecondsBetween(now, getNextDayOfWeek("Tuesday", now) - offset);
};
