import { Box } from "@mui/material";

export default function Tiles({ cells, children, styleCell, ...props }) {
  return (
    <Box {...props}>
      {cells.map((e, i) =>
        e.map((f, j) => {
          return (
            <Tile
              size={[e.length, cells.length]}
              row={i}
              col={j}
              props={styleCell(i, j, f)}
            >
              {children}
            </Tile>
          );
        })
      )}
    </Box>
  );
}

function Tile({
  size: [cols, rows],
  row,
  col,
  children,
  props: { sx, ...props },
}) {
  const [w, h] = [100 / cols, 100 / rows];
  const [left, top] = [col * w, row * h];
  return (
    <Box
      sx={{
        ...sx,
        width: w + "%",
        height: h + "%",
        float: "left",
        overflow: "hidden",
        position: "relative",
      }}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          top: -top * rows + "%",
          left: -left * cols + "%",
          width: 100 * cols + "%",
          height: 100 * rows + "%",
        }}
      >
        {children}
      </div>
    </Box>
  );
}
