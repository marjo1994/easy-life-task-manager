import type { TaskTag } from "../__generated__/graphql";

export const tagColors: Record<
  TaskTag,
  { bg: string; text: string; indicatorBg: string }
> = {
  ANDROID: {
    bg: "bg-tertiary-300/10",
    text: "text-tertiary-300",
    indicatorBg: "bg-tertiary-300",
  },
  IOS: {
    bg: "bg-secondary-300/10",
    text: "text-secondary-300",
    indicatorBg: "bg-secondary-300",
  },
  NODE_JS: {
    bg: "bg-blue-100/10",
    text: "text-blue-100",
    indicatorBg: "bg-blue-100",
  },
  RAILS: {
    bg: "bg-primary-300/10",
    text: "text-primary-300",
    indicatorBg: "bg-primary-300",
  },
  REACT: {
    bg: "bg-neutral-100/10",
    text: "text-neutral-50",
    indicatorBg: "bg-neutral-100",
  },
};
