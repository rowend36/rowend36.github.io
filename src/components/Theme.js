import { createTheme } from "@mui/material";
import blue from "@mui/material/colors/blue";
import "@fontsource/open-sans";
import "@fontsource/playfair-display";
import { blueGrey, grey } from "@mui/material/colors";

/**
 * @type {import("@mui/material").ThemeOptions & Record<string, Any>}
 */
const baseTheme = {
  xSpacing: { xs: 2, sm: 3, md: 6, lg: 8, xl: 10 },
  colors: [
    "#171219",
    "#310d20",
    "#005B4F",
    "#225560",
    "#f0803c",
    "#EE964B",
    "#FF8360",
    "#B38CB4",
    "#edf060",
    "#E1F4CB",
    "#FFF7F1",
  ],
  /* Extended Array */
  bgPalette: {
    black: "#131111",
    primary: "#96693D",
    black_contrast: "#23201F",
    white: "#EAE6DD",
  },
  shape: {
    borderRadius: 0,
  },
  breakpoints: {
    values: {
      xs: 0,
      sl: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
    subtitle1: {
      fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
    },
    subtitle2: {
      fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
    },
    body1: {
      fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
    },
    body2: {
      fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
    },
    button: {
      fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
    },
    caption: {
      fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
    },
    overline: {
      fontFamily: '"Open Sans","Helvetica","Arial",sans-serif',
    },
    h1: {
      fontFamily: '"Playfair Display","Helvetica","Arial",sans-serif',
    },
    h2: {
      fontFamily: '"Playfair Display","Helvetica","Arial",sans-serif',
    },
    h3: {
      fontFamily: '"Playfair Display","Helvetica","Arial",sans-serif',
    },
    h4: {
      fontFamily: '"Playfair Display","Helvetica","Arial",sans-serif',
    },
    h5: {
      fontFamily: '"Playfair Display","Helvetica","Arial",sans-serif',
    },
    h6: {
      fontFamily: '"Playfair Display","Helvetica","Arial",sans-serif',
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    background: { default: baseTheme.colors[9], paper: "#ffffff" },
    text: { primary: "#000000", secondary: "#666666", highlight: "#101010" },
  },
  bg_gradient: "#F4F6FA",
  ...baseTheme,
});

export const darkTheme = createTheme({
  palette: {
    background: {
      paper: "#181818",
      default: baseTheme.colors[1],
    },
    text: { primary: "#ffffff", secondary: "#dddddd", highlight: "#ffffff" },
    mode: "dark",
  },
  bg_gradient:
    "linear-gradient(to right bottom, #051937, #5d2d60, #b63f61, #ee7541, #ebc512)",
  ...baseTheme,
});

export default baseTheme;
