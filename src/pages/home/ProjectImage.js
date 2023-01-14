import { useState } from "react";
import { Card, Paper } from "@mui/material";

export default function ProjectImage({
  children,
  src,
  i,
  label = "No label",
  bgColor,
  sx,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const onMouseOver = () => {
    setHovered(true);
  };
  const onMouseOut = () => {
    setHovered(false);
  };
  return (
    <Paper
      elevation={hovered ? 10 : 0}
      sx={{
        transform: hovered ? "translateY(-10px) scale(1.1)" : undefined,
        transition: !hovered ? "all .2s linear" : "all .3s ease-in-out .7s",
        // TODO make this a gradient
        background: bgColor,

        ...sx,
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      {...props}
    >
      <img
        src={src}
        alt={label}
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          // display: "block",
          width: hovered ? "100%" : "80%",
          margin: hovered ? "0" : "10%",
          transition: !hovered ? "all .2s linear" : "all .5s ease-in-out .2s",
        }}
      />
    </Paper>
  );
}
