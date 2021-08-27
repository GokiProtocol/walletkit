export const BREAKPOINT_SIZES = [576, 780, 992, 1200] as const;

const maxMediaQueries = BREAKPOINT_SIZES.map(
  (bp) => `@media (max-width: ${bp}px)`
);

export const breakpoints = {
  mobile: maxMediaQueries[0],
  tablet: maxMediaQueries[1],
  medium: maxMediaQueries[2],
};
