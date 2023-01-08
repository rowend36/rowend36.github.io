import Span from "@mui/material/Typography";
import FullPageCard from "../../components/FullPageCard";
// import { Masonry } from "@mui/lab";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import projects from "../../logic/projects";
import Box from "@mui/material/Box";
import useResponsiveColumns from "../../utils/useResponsiveColumns";
import { useState } from "react";
import { Card, Paper } from "@mui/material";

const ProjectImage = ({ children, sx, ...props }) => {
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
        transform: hovered ? "translateY(-2px) scale(1.03)" : undefined,
        transition: "all .3s ease-in-out",
        ...sx,
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      component="img"
      {...props}
    />
  );
};
const Home = () => {
  const numColumns = useResponsiveColumns(300, 200);
  return (
    <FullPageCard sx={{ pt: 4 }}>
      <Span variant="h1" align="center">
        ROWEND36
      </Span>
      <Box sx={{ px: 4, py: 4 }}>
        <Span variant="body1" sx={{ fontSize: "1.5rem" }}>
          Good day.
          <br />
          My name is Owologba Oro.
          <br />I am a software developer.
          <br />
          Feel free to take a look around.
        </Span>
      </Box>
      <Box
        component={Masonry}
        breakpointCols={numColumns}
        spacing={1}
        sx={{
          display: "flex",
          width: "auto",
          px: 0.5,
        }}
      >
        {projects.map(({ image, link }) => {
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
                image.map((image, i, arr) => (
                  <ProjectImage
                    src={image}
                    style={{
                      display: "block",
                      flexGrow: 1,
                      marginLeft: i > 0 ? "5px" : 0,
                      width: "10px",
                    }}
                  />
                ))
              ) : (
                <ProjectImage
                  src={image}
                  style={{ display: "block", width: "100%" }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </FullPageCard>
  );
};

export default Home;
