import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import useLogger from "../utils/useLogger";
export default function Animation({
  state = "playing",
  timeline: timelineData,
  scene,
  ref,
  ...props
}) {
  const [timeline, setTimeLine] = useState(null);
  const svgRef = useRef();
  useLogger(scene);
  useLogger(timeline);
  useLogger(state);
  useEffect(
    function () {
      if (scene) {
        const svg = svgRef.current;
        svg.innerHTML = "";
        svg.appendChild(buildNode(scene));
      }
    },
    [scene]
  );
  useEffect(
    function () {
      const timeline = timelineData ? buildTimeline(timelineData) : null;
      setTimeLine(timeline);
      return () => timeline && timeline.seek(0).kill();
    },
    [timelineData]
  );
  useEffect(
    function () {
      if (!scene || !timeline) return;
      switch (state) {
        case "paused":
          timeline.pause();
          break;
        case "stopped":
          timeline.stop();
          break;
        // case "started":
        default:
          timeline.play();
          timeline.resume();
          break;
      }
    },
    [state, scene, timeline]
  );

  return <svg ref={svgRef} {...props}></svg>;
}

const buildNode = (node) => {
  const children = node.children ? node.children.map(buildNode) : [];
  const matrix = matrixOf(node);
  const main = node.type ? crelt("svg:" + node.type, node.props) : null;
  if (children.length > 0) {
    if (main) children.unshift(main);
    return crelt("svg:group");
  }
  gsap.set(
    main,
    "matrix(" + [0, 1, 3, 4, 6, 7].map((i) => matrix[i]).join(",") + ")"
  );
  return main;
};
const buildTimeline = (i, subject) => {
  // Timelines are basically gsap methods and arguments
  const [a, b] = i;
  let d;
  if (typeof a == "string" || Array.isArray(a)) {
    d = gsap.to(a, b);
  } else {
    d = gsap.timeline(a);
    b.forEach((e) => d.add(buildTimeline(e)));
  }
  return d;
};

// Get the initial transformation matrix
// of the nodes in the scene for use with GSAP
function matrixOf({ x = 0, y = 0, w = 0, h = 0, sx = 1, sy = 1, r = 0 }) {
  //scaleX, skewY, 0, skewX, scaleY, 0, translateX, translateY, 1
  const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  matrix[6] += x;
  matrix[7] += y;

  const ox = x + w / 2;
  const oy = y + h / 2;

  matrix[6] -= ox;
  matrix[7] -= oy;
  matrix_multiply(this.matrix, [sx, 0, 0, 0, sy, 0, 0, 0, 1]);
  const s = Math.sin(r),
    c = Math.cos(r);
  matrix_multiply(this.matrix, [c, -s, 0, s, c, 0, 0, 0, 1]);
  matrix[6] += ox;
  matrix[7] += oy;
  return matrix;
}

function matrix_multiply(mat1, mat2) {
  const mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        mat3[i + j * 3] += mat1[i + k * 3] * mat2[k + j * 3];
      }
    }
  }
  return mat3;
}

const ns = {
  svg: "http://www.w3.org/2000/svg",
};
const colors = {
  dark: "#0d2751",
};

const crelt = function (type, attrs, children = null) {
  /** @type {Element} */
  const m =
    type instanceof Element
      ? type
      : type.indexOf(":") > -1
      ? document.createElementNS(ns[type.split(":")[0]], type.split(":")[1])
      : document.createElement(type);
  if (attrs != null)
    for (const o in attrs) {
      o.indexOf(":") > -1
        ? m.setAttributeNS(ns[o.split(":")[0]], o.split(":")[1], attrs[o])
        : o === "style"
        ? Object.assign(m.style, attrs[o])
        : m.setAttribute(o, attrs[o]);
    }
  if (children != null)
    for (const o of children) {
      m.appendChild(
        Array.isArray(o)
          ? crelt(...o)
          : typeof o == "string"
          ? document.createTextNode(o)
          : o
      );
    }
  return m;
};

const Shadow = (id, color, elevation, opacity = 0.5) => {
  const allowance = Math.max(elevation, 20);
  return [
    "svg:filter",
    {
      id,
      "color-interpolation-filters": "sRGB",
      height: 100 + allowance * 5 + "%",
      width: 100 + allowance * 1.1 + "%",
      x: -allowance + "%",
    },
    [
      [
        "svg:feDropShadow",
        {
          dx: "-1",
          dy: "2",
          stdDeviation: Math.max(elevation / 5, 1),
          "flood-opacity": opacity / Math.max(elevation, 2),
          "flood-color": colors.dark,
        },
      ],
      [
        "svg:feDropShadow",
        {
          dx: Math.ceil(elevation * 0.05),
          dy: elevation,
          stdDeviation: elevation * 0.9,
          "flood-opacity": Math.log(elevation * 4) * 0.1 * opacity,
          "flood-color": colors.dark,
        },
      ],
    ],
  ];
};
let filterId = 0;

const Shape = ({ x, y, elevation, path, shadowOpacity, ...props }) => {
  return crelt(
    "svg:path",
    {
      d: `M ${x} ${y} ${path}`,
      filter: elevation > 0 ? `url("#filter-${++filterId}")` : null,
      ...props,
    },
    elevation > 0
      ? [Shadow("filter-" + filterId, "#000000", elevation, shadowOpacity)]
      : null
  );
};

const Rect = ({
  w,
  h,
  r = 0,
  rtl = r,
  rbl = r,
  rtr = r,
  rbr = r,
  ...props
}) => {
  return Shape({
    path: `m ${w - rtr} 0 l ${
      -w + rtr + rtl
    } 0 a ${rtl} ${rtl} 0 0 0 ${-rtl} ${rtl} l 0 ${
      h - rtl - rbl
    } a ${rbl} ${rbl} 0 0 0 ${rbl} ${rbl} l ${
      w - rbl - rbr
    } 0 a ${rbr} ${rbr} 0 0 0 ${rbr} ${-rbr} l 0 ${
      -h + rbr + rtr
    } a ${rtr} ${rtr} 0 0 0 ${-rtr} ${-rtr}`,
    ...props,
  });
};
