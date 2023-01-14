import projects from "../../logic/projects";
import ProjectImage from "./ProjectImage";
import useResponsiveColumns from "../../utils/useResponsiveColumns";

import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Span from "@mui/material/Typography";

export default function Projects() {
  const numColumns = useResponsiveColumns(300, 200);
  let j = 0;
  return (
    <>
      <Span variant="h3" align="center" mt={10} mb={2}>
        PORTFOLIO PROJECTS
      </Span>
      <Box
        component={Masonry}
        breakpointCols={numColumns}
        spacing={1}
        sx={{
          display: "flex",
          width: "auto",
        }}
      >
        {projects.map(({ image, link, bgColor }) => {
          return (
            <Box
              component={Link}
              href={link}
              sx={
                Array.isArray(image)
                  ? { display: "flex", p: 0.5 }
                  : { display: "block", p: 0.5 }
              }
            >
              {Array.isArray(image) ? (
                (j++,
                image.map((image, i, arr) => (
                  <ProjectImage
                    i={j}
                    src={image}
                    bgColor={bgColor}
                    style={{
                      display: "block",
                      flexGrow: 1,
                      marginLeft: i > 0 ? "5px" : 0,
                      width: "10px",
                    }}
                  />
                )))
              ) : (
                <ProjectImage
                  i={j++}
                  src={image}
                  bgColor={bgColor}
                  style={{ display: "block", width: "100%" }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
}
