import { format, parseISO, isValid } from "date-fns";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const normalizeDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const MS_IN_DAY = 24 * 60 * 60 * 1000;

export const formatDate = (isoString: string): Record<string, string> => {
  if (!isoString) return { text: "No date", color: "text-gray-400" };

  const dateOnly = isoString.split("T")[0];
  const date = parseISO(dateOnly);

  if (!isValid(date)) {
    return { text: "Invalid date", color: "text-gray-400" };
  }

  const today = new Date();
  const todayNormalized = normalizeDate(today);
  const targetNormalized = normalizeDate(date);

  const diffTime = targetNormalized.getTime() - todayNormalized.getTime();
  const diffDays = Math.round(diffTime / MS_IN_DAY);

  let color = "text-green-500 filter-green";
  if (diffDays < 0) color = "text-red-400 filter-custom-red";
  else if (diffDays < 2) color = "text-yellow-500 filter-yellow";

  if (diffDays === 0) return { text: "TODAY", color };
  if (diffDays === -1) return { text: "YESTERDAY", color };

  const day = format(date, "dd");
  const month = format(date, "MMMM").toUpperCase();
  const year = format(date, "yyyy");

  return { text: `${day} ${month}, ${year}`, color };
};

export const isoToDateOnly = (isoString: string | null): string | null => {
  if (!isoString) return null;
  return isoString.split("T")[0];
};

export const dateOnlyToISO = (dateOnly: string | null): string | null => {
  if (!dateOnly) return null;
  return `${dateOnly}T00:00:00.000Z`;
};

export const formatToDateOnly = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const parseDateOnly = (dateOnly: string | null): Date | null => {
  if (!dateOnly) return null;
  try {
    const parsed = parseISO(dateOnly);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
};
