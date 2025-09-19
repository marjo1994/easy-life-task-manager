import { format, parseISO, isValid } from "date-fns";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const normalizeDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const MS_IN_DAY = 24 * 60 * 60 * 1000;

export const formatDate = (isoString: string): string => {
  if (!isoString) return "No date";

  const dateOnly = isoString.split("T")[0];
  const date = parseISO(dateOnly);

  if (!isValid(date)) {
    return "Invalid date";
  }

  const today = new Date();
  const todayNormalized = normalizeDate(today);
  const targetNormalized = normalizeDate(date);

  const diffTime = targetNormalized.getTime() - todayNormalized.getTime();
  const diffDays = Math.round(diffTime / MS_IN_DAY);

  if (diffDays === 0) return "TODAY";
  if (diffDays === -1) return "YESTERDAY";

  const day = format(date, "dd");
  const month = format(date, "MMMM").toUpperCase();
  const year = format(date, "yyyy");

  return `${day} ${month}, ${year}`;
};
