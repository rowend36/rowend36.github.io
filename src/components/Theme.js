import { createTheme } from "@mui/material";
import blue from "@mui/material/colors/blue";
import "@fontsource/open-sans";
import "@fontsource/playfair-display";
import { blueGrey, grey } from "@mui/material/colors";
/**
 * @type {import("@mui/material").ThemeOptions}
 */
const baseTheme = {
  shape: {
    borderRadius: 0,
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
  },
};

export const lightTheme = createTheme({
  palette: {
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#000000", secondary: "#666666" },
  },
});

export const darkTheme = createTheme(
  {
    palette: {
      background: {
        paper: "#32234C",
        default: "#020024",
      },
      mode: "dark",
    },
    bg_gradient:
      "linear-gradient(to right bottom, #051937, #5d2d60, #b63f61, #ee7541, #ebc512)",
  },
  baseTheme
);

export default lightTheme;
