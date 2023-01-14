import { IconButton } from "@mui/material";
import { useAppContext, updateContext } from "../components/AppContext";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
export default function ThemeToggleButton(props) {
  const lightTheme = useAppContext((s) => s.useLightTheme);
  const toggleTheme = () => {
    updateContext((s) => ({ ...s, useLightTheme: !lightTheme }));
  };
  return (
    <IconButton onClick={toggleTheme} {...props}>
      {lightTheme ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}
