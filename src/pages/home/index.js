import Span from "@mui/material/Typography";
import Root from "../../components/Root";
// import { Masonry } from "@mui/lab";

import ThemeToggleButton from "../../components/ThemeToggleButton";
import { Box, useScrollTrigger, useTheme } from "@mui/material";
import Projects from "./Projects";
import Tiles from "../../components/Tiles";
import baseTheme from "../../components/Theme";
import ThemeColors from "../../components/ThemeColors";
import useWidth from "../../utils/useWidth";
import { useCallback, useEffect, useRef, useState } from "react";
import useAnimationEffect from "../../utils/useAnimationEffect";
import useLogger, { useStateLogger } from "../../utils/useLogger";
import gradient from "../../utils/gradient";
const AnimationStates = {
  Flip: 0,
  Unfold: 1,
  Unfold2: 2,
  Unfold3: 3,
  Unfolded: 4,
};
const AnimationFlags = { None: 0, ClickedFlip: 1 };
const Home = ({ window }) => {
  const c = baseTheme.colors;
  const theme = useTheme();
  const isMobile = useWidth({ xs: true, sm: false });
  const backgrounds = isMobile
    ? [[c[1], c[8]]]
    : [
        [c[1], c[4]],
        [c[8], c[2]],
      ];
  const [animationState, setAnimationState] = useState(AnimationStates.Flip);
  useStateLogger(animationState, AnimationStates);
  const [animationFlags, setAnimationFlags] = useState(AnimationFlags.None);
  const [flipRow, flipCol] = useFlipAnimation(
    backgrounds.length,
    backgrounds[0].length,
    isMobile,
    animationState === AnimationStates.Flip
  );
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  // useEffect(
  //   function () {
  //     if (trigger) {
  //       if (animationState === AnimationStates.Flip) {
  //         setAnimationState(AnimationStates.Unfold);
  //       }
  //     } else if (!trigger && animationState !== AnimationStates.Flip) {
  //       if (animationFlags & AnimationFlags.ClickedFlip) return;
  //       setAnimationState(AnimationStates.Flip);
  //     }
  //   },
  //   [trigger, animationState, animationFlags]
  // );
  //More reliable transition end events
  const guard = useRef();
  const onTransitionEnd = useCallback(() => {
    if (guard.current) clearTimeout(guard.current);
    switch (animationState) {
      case AnimationStates.Unfold:
      case AnimationStates.Unfold2:
      case AnimationStates.Unfold3:
        setAnimationState(animationState + 1);
        break;
      default:
      //do nothing
    }
  }, [animationState]);
  useEffect(
    function () {
      switch (animationState) {
        case AnimationStates.Unfold:
        case AnimationStates.Unfold3:
          guard.current = setTimeout(onTransitionEnd, 1000);
          break;
        case AnimationStates.Unfold2:
          guard.current = setTimeout(onTransitionEnd);
          break;
        case AnimationStates.Unfolded:
          guard.current = setTimeout(
            () => setAnimationState(AnimationStates.Flip),
            3000
          );
          break;
        default:
        //do nothing
      }
      return () => {
        clearTimeout(guard.current);
        guard.current = null;
      };
    },
    [animationState, onTransitionEnd]
  );
  const onClick = () => {
    switch (animationState) {
      case AnimationStates.Flip:
        setAnimationFlags(animationFlags | AnimationFlags.ClickedFlip);
        setAnimationState(AnimationStates.Unfold);
        break;
      default:
      //do nothing
    }
  };
  const speed = (t) => `color ${t}s, background-color ${t}s, transform ${t}s`;
  return (
    <>
      <Tiles
        sx={{ width: "100vw", height: "100vh" }}
        cells={
          animationState === AnimationStates.Unfolded
            ? [[null]]
            : isMobile
            ? [[c[8], c[1]]]
            : [
                [c[10], c[0]],
                [c[0], c[10]],
              ]
        }
        onClick={onClick}
        styleCell={(row, col, color) => {
          const invert = (row + col) % 2;
          return {
            sx: Object.assign(
              {
                transition: speed(2),
                perspective: "100cm",
                transform: "rotateY(0deg)",
              },
              animationState === AnimationStates.Flip &&
                flipRow === row &&
                flipCol === col
                ? {
                    background: color === c[10] ? c[9] : color,
                    color: backgrounds[row][col],
                  }
                : animationState === AnimationStates.Unfold ||
                  animationState === AnimationStates.Unfold2
                ? gradient(
                    { color, background: backgrounds[row][col] },
                    // prettier-ignore
                    (invert < 1) === (animationState > AnimationStates.Unfold2)
                      ? 90
                      : -90
                  )
                : animationState > AnimationStates.Unfold2
                ? { color: c[9], background: c[2] }
                : { color, background: backgrounds[row][col] },

              animationState === AnimationStates.Unfold
                ? {
                    transform: `rotateY(${89 - 178 * invert}deg)`,
                    transition: speed(1),
                  }
                : animationState === AnimationStates.Unfold2
                ? {
                    // TODO do this flip manually before entering state Unfold3
                    transform: `rotateY(${271 - 542 * invert}deg)`,
                    transition: speed(0),
                  }
                : animationState === AnimationStates.Unfold3
                ? {
                    transform: `rotateY(${360 - 720 * invert}deg)`,
                    transition: speed(1),
                  }
                : animationState === AnimationStates.Unfolded
                ? {
                    transform: `rotateY(0deg)`,
                    transition: speed(0),
                  }
                : null
            ),
            // onTransitionEnd: onTransitionEnd,
          };
        }}
      >
        <Root
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Span
            align="center"
            variant="h1"
            sx={{
              lineHeight: "1",
              color: "inherit",
              m: 0,
              mb: "0.18em",
              [theme.breakpoints.down("sm")]: { fontSize: "14vw" },
            }}
          >
            {animationState < AnimationStates.Unfold2 ? "ROWEND36" : "Hello"}
          </Span>
        </Root>
      </Tiles>
      <Root>
        <Projects />
      </Root>

      <ThemeColors />
    </>
  );
};

const useFlipAnimation = (numRows, numCols, revertFirst, enabled) => {
  const flipData = useRef([-1, 0, -1]);
  let [flipRow, flipCol, flipDir] = flipData.current;
  useAnimationEffect(
    function () {
      if (flipDir < 0 || revertFirst) flipDir = -flipDir;
      if (flipDir === 2) {
        flipCol = (flipCol + 1) % numCols;
        if (numRows > 1) flipDir = 1;
      } else if (flipDir === 1) {
        flipRow = (flipRow + 1) % numRows;
        if (numCols > 1) flipDir = 2;
      }
      flipData.current = [flipRow, flipCol, flipDir];
    },
    enabled ? 4000 : -1
  );

  if (flipDir < 0) {
    flipRow = flipCol = -1;
  }
  return [flipRow, flipCol];
};

export default Home;
