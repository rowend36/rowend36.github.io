import { useMediaQuery, useTheme } from "@mui/material";

const MAX_BREAKPOINTS = 5;
export const useWidth = (picker) => {
  const theme = useTheme();
  const keys = theme.breakpoints.keys;
  let best;
  for (var i = MAX_BREAKPOINTS - 1; i >= 0; i--) {
    const key = keys[i];
    if (
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useMediaQuery(theme.breakpoints.up(key)) &&
      key &&
      (!picker || picker.hasOwnProperty(key))
    )
      best = best || key;
  }
  best = best || keys[0];
  return picker ? picker[best] : best;
};
export default useWidth;
