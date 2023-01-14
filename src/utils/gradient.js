import { lighten } from "@mui/material";

export default function gradient(sx, angle = 90) {
  const m = sx.background;
  if (/#[a-f0-9]{6}/.test(m)) {
    const gradient = `linear-gradient(${angle}deg, ${m},70%, ${lighten(
      m,
      0.1
    )})`;
    sx.background = gradient;
  }
  return sx;
}
