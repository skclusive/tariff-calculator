import { For, createSignal, useContext } from "solid-js";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@suid/material";
import { Brightness4, Brightness7 } from "@suid/icons-material";
import { Logo } from "./Logo";
import { ThemeModeContext } from "./ThemeContext";

export function Header(props: {
  year: string;
  setYear: (year: string) => void;
}) {
  const theme = useTheme();
  const toggleThemeMode = useContext(ThemeModeContext);
  const [anchorElUser, setAnchorElUser] = createSignal(null);

  const handleOpenYear = (event: MouseEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseYear = () => {
    setAnchorElUser(null);
  };

  const handleSelectYear = (year: string) => {
    props.setYear(year);
    handleCloseYear();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Logo sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tariff Calculator
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleOpenYear} sx={{ p: 0, color: "inherit" }}>
            <Typography variant="h6">{props.year}</Typography>
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser()}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser())}
            onClose={handleCloseYear}
          >
            <For each={["2024", "2020"]}>
              {(year) => (
                <MenuItem
                  onClick={() => handleSelectYear(year)}
                  selected={props.year === year}
                >
                  <Typography textAlign="center">{year}</Typography>
                </MenuItem>
              )}
            </For>
          </Menu>
        </Box>
        <IconButton sx={{ ml: 1 }} onClick={toggleThemeMode} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
