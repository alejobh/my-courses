export const getSkeletonQuantity = (isFetching: boolean) =>
  // This 0 should be 1 for infinite scroll query
  Array.from(Array(isFetching ? 1 : 8).keys());
