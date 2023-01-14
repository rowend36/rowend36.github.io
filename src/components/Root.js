import { Container, Box, useTheme } from "@mui/material";
import baseTheme from "./Theme";
export default function Root({
  backgroundProps = {},
  children,
  isHome,
  sx,
  ...props
}) {
  return (
    <Container
      sx={{
        px: baseTheme.xSpacing,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Container>
  );
}
