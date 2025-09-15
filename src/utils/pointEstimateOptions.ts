import { PointEstimate } from "../__generated__/graphql";
import { pointEstimateToNumber } from "./pointEstimateToNumber";

type PointEstimateOption = { value: PointEstimate; label: string };

export const PointEstimateOptions: PointEstimateOption[] = Object.values(
  PointEstimate
)
  .map((value) => {
    const num = pointEstimateToNumber(value);
    return {
      value,
      label: `${num} Points`,
      sortKey: num,
    };
  })
  .sort((a, b) => a.sortKey - b.sortKey)
  .map(({ sortKey, ...rest }) => rest);
