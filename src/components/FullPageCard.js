import { Container, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useLayoutEffect } from "react";
import theme from "./Theme";
/**
 * The full page card is an elevated surface which fills the entire screen.
 * It is meant to be used with a colored background.
 * Full page cards come with transitions for entering and exiting.
 */
const xSpacing = theme.xSpacing;
const FullPageCard = ({ children, sx, ...props }) => {
  return (
    <Container sx={{ py: { xs: 10 }, px: xSpacing }}>
      <Paper
        sx={{ width: "100%", px: xSpacing, ...sx }}
        elevation={9}
        {...props}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default FullPageCard;
