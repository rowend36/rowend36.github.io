import Act from "../../../components/animations/Act";
import {
  cleanUp,
  tick,
  raf,
} from "../../../components/animations/time_helpers";

/**
 * The color toggle animation changes the color of each tile
 * one after the other.
 */
export default class ColorToggle extends Act {
  onEnter(cells, numRows, numCols, getStyle, revertFirst) {
    let [flipRow, flipCol, flipDir] = [-1, 0, -1];
    const update = () =>
      raf(this, () => {
        cells.forEach((e, i) => {
          const [row, column] = [Math.floor(i / numRows), i % numCols];
          const style = getStyle(
            row,
            column,
            flipDir > -1 && flipRow === row && flipCol === column
          );
          Object.assign(e.style, style);
        });
      });
    tick(
      this,
      () => {
        if (flipDir < 0 || revertFirst) flipDir = -flipDir;
        if (flipDir === 2) {
          flipCol = (flipCol + 1) % numCols;
          if (numRows > 1) flipDir = 1;
        } else if (flipDir === 1) {
          flipRow = (flipRow + 1) % numRows;
          if (numCols > 1) flipDir = 2;
        }
        update();
      },
      4000
    );
    return () => {
      flipRow = flipCol = -1;
      cleanUp(this);
      //This must come last since it should not be cleared
      update();
    };
  }
}
