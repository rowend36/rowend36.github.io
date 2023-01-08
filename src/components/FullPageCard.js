import { Container, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useLayoutEffect } from "react";
/**
 * The full page card is an elevated surface which fills the entire screen.
 * It is meant to be used with a colored background.
 * Full page cards come with transitions for entering and exiting.
 */

const FullPageCard = ({ children, sx, ...props }) => {
  const theme = useTheme();
  useLayoutEffect(() => {
    document.body.style.background = theme.bg_gradient;
  }, [theme]);
  return (
    <Container sx={{ py: 10, px: 10 }}>
      <Paper sx={{ width: "100%", ...sx }} elevation={9} {...props}>
        {children}
      </Paper>
    </Container>
  );
};

export default FullPageCard;
