export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const MS_IN_DAY = 1000 * 60 * 60 * 24;

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const normalize = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const todayTime = normalize(new Date());
  const dateTime = normalize(date);

  if (dateTime === todayTime) return "TODAY";
  if (dateTime === todayTime - MS_IN_DAY) return "YESTERDAY";

  const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = date
    .toLocaleDateString("en-GB", { month: "long" })
    .toUpperCase();
  const year = date.toLocaleDateString("en-GB", { year: "numeric" });

  return `${day} ${month}, ${year}`;
};
