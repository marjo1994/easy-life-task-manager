export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
