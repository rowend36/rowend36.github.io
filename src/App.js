import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider, useAppContext } from "./components/AppContext";
import { lightTheme, darkTheme } from "./components/Theme";

const ThemeSwitcher = ({ children }) => {
  const theme = useAppContext((store) =>
    store.useLightTheme ? lightTheme : darkTheme
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
function App() {
  return (
    <Provider>
      <ThemeSwitcher>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeSwitcher>
    </Provider>
  );
}

export default App;
