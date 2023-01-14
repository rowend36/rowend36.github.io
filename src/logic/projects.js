import {
  red,
  yellow,
  green,
  blue,
  purple,
  pink,
  orange,
  grey,
} from "@mui/material/colors";
const projects = [
  {
    image: require("../assets/projects/grace.jpg"),
    link: "https://grace-editor.web.app",
    bgColor: blue[400],
  },
  {
    image: require("../assets/projects/disburse.png"),
    link: "https://disburse.ng",
    bgColor: red[500],
  },
  {
    image: require("../assets/projects/rexdreams.png"),
    link: "https://rexdreams.com",
    bgColor: yellow[500],
  },
  {
    image: [
      require("../assets/projects/errandboss.png"),
      require("../assets/projects/errandboss2.png"),
    ],
    link: "https://rexdreams.com",
    bgColor: grey[200],
  },
];

export default projects;
