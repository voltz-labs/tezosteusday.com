export type WeekDay =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const WEEK_DAYS: WeekDay[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getNextDayOfWeek = (weekDay: WeekDay, reference: number) => {
  const index = WEEK_DAYS.indexOf(weekDay);

  const date = new Date(reference);

  date.setHours(0, 0, 0, 0);

  date.setDate(
    new Date(reference).getDate() +
      1 +
      ((index + 7 - new Date(reference).getDay() - 1) % 7)
  );

  return date.getTime();
};
