import useWindowSize from "./useWindowSIze";

export default function useResponsiveColumns(itemWidth, h_margin) {
  const size = useWindowSize().width;
  return Math.min(
    6,
    Math.max(1, Math.floor(((size || 0) - h_margin) / itemWidth))
  );
}
