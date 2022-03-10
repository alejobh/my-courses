export const getSkeletonQuantity = (isFetching: boolean) =>
  Array.from(Array(isFetching ? 1 : 8).keys());
