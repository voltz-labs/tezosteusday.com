import { getDay } from "date-fns";
import { getNextDayOfWeek } from "./getNextDayOfWeek";
import { getSecondsBetween } from "./getSecondsBetween";

export const getSecondsToTuesday = () => {
  const now = Date.now();

  const isTuesday = getDay(now) === 2;

  if (isTuesday) {
    return 0;
  }

  return getSecondsBetween(now, getNextDayOfWeek("Tuesday", now));
};
