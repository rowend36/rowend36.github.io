// Based on MUI shadows generator
// https://github.com/mui-org/material-ui/blob/57e8a88faeebba4d67aaaf6c5b178ebfe97264a6/packages/material-ui/src/styles/shadows.js

let shadowKeyUmbraOpacity = 0.1;
let shadowKeyPenumbraOpacity = 0.06;
let shadowAmbientShadowOpacity = 0.04;
let n = 24;

// Easing Functions from @gre: https://gist.github.com/gre/1650294
const EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) {
    return t;
  },
  // accelerating from zero velocity
  easeInQuad: function (t) {
    return t * t;
  },
  // decelerating to zero velocity
  easeOutQuad: function (t) {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity
  easeInCubic: function (t) {
    return t * t * t;
  },
  // decelerating to zero velocity
  easeOutCubic: function (t) {
    return --t * t * t + 1;
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity
  easeInQuart: function (t) {
    return t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuart: function (t) {
    return 1 - --t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  // accelerating from zero velocity
  easeInQuint: function (t) {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuint: function (t) {
    return 1 + --t * t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  },
};

function createShadow(...px) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px rgba(243, 243, 243, ${px[3]})`,
    `${px[4]}px ${px[5]}px ${px[6]}px rgba(24, 24, 43, ${px[7]})`,
    `${px[8]}px ${px[9]}px ${px[10]}px rgba(0, 0, 0, ${px[11]})`,
  ].join(",");
}

const shadows = [];

for (i = 0; i <= n; i++) {
  if (i === 0) {
    shadows.push("none");
  } else {
    let j = (i - 1) / (n - 1);
    shadows.push(
      createShadow(
        0,
        Math.round(5 + j * 2),
        Math.round(15 + j * 8),
        +(0.45 - j * 0.1).toFixed(4),
        0,
        +(1 + j * 4).toFixed(4),
        Math.round(6 - j * 5),
        +(0.02 + j * 0.15).toFixed(4),
        0,
        +(2 + j * 0.25).toFixed(4),
        +(16 + j * 8).toFixed(4),
        +(0.02 + j * 0.15).toFixed(4)
      )
    );
  }
}
console.log('"' + shadows.join('",\n') + '"');
