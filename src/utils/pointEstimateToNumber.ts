import { PointEstimate } from "../__generated__/graphql";

export const pointEstimateToNumber = (
  estimate: keyof typeof PointEstimate | string
): number => {
  switch (estimate) {
    case PointEstimate.Zero:
      return 0;
    case PointEstimate.One:
      return 1;
    case PointEstimate.Two:
      return 2;
    case PointEstimate.Four:
      return 4;
    case PointEstimate.Eight:
      return 8;
    default:
      return 0;
  }
};
