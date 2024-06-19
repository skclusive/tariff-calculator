import { createEffect, createMemo, createSignal } from "solid-js";
import {
  CssBaseline,
  createPalette,
  createTheme,
  useMediaQuery,
  ThemeProvider,
} from "@suid/material";
import { Main } from "./Main";
import { ThemeModeContext } from "./ThemeContext";

export function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = createSignal<"light" | "dark">(
    prefersDarkMode() ? "dark" : "light"
  );
  createEffect(() => {
    setThemeMode(prefersDarkMode() ? "dark" : "light");
  });
  const toggleThemeMode = () => {
    setThemeMode(themeMode() === "light" ? "dark" : "light");
  };

  const palette = createMemo(() =>
    createPalette({
      mode: themeMode(),
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#01579b",
      },
    })
  );

  const theme = createTheme({
    palette,
    components: {
      MuiButton: {
        defaultProps: {
          variant: "outlined",
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "standard",
        },
      },
    },
  });
  return (
    <ThemeModeContext.Provider value={toggleThemeMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Main />
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
