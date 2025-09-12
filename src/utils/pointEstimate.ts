import { PointEstimate } from "@/types/__generated__/graphql";
export function pointEstimateToNumber(pointEstimate: PointEstimate): number {
  switch (pointEstimate) {
    case PointEstimate.One:
      return 1;
    case PointEstimate.Two:
      return 2;
    case PointEstimate.Four:
      return 4;
    case PointEstimate.Eight:
      return 8;
    case PointEstimate.Zero:
      return 0;
    default:
      return 0;
  }
}
