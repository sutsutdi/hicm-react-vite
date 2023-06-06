import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box } from "@mui/material";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type AppHeader = {
  open: boolean;
  onDrawerOpen: () => void;
};

export default function AppHeader({ open, onDrawerOpen }: AppHeader) {
  const handleDrawerOpen = () => {
    onDrawerOpen();
  };

  const handleFullscreen = () => {
    const element = document.documentElement;
    element.requestFullscreen();
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Persistent drawer
        </Typography>
        <Box flexGrow={1}></Box>
        <IconButton
          color="inherit"
          aria-label="full screen"
          onClick={handleFullscreen}
          edge="start"
          sx={{ ml: 5, ...(open && { display: "none" }) }}
        >
          <FullscreenIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
