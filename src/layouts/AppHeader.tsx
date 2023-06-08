import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import { Avatar, Box, CardMedia, Paper, Tooltip } from '@mui/material'
import { Logout, Settings } from '@mui/icons-material'
import LogoImg from '../assets/logo.png'
const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

type AppHeader = {
  open: boolean
  onDrawerOpen: () => void
}

export default function AppHeader({ open, onDrawerOpen }: AppHeader) {
  const handleDrawerOpen = () => {
    onDrawerOpen()
  }

  const handleFullscreen = () => {
    const element = document.documentElement
    element.requestFullscreen()
  }

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <CardMedia
          component={'img'}
          sx={{ height: 50, width: 50 ,borderRadius: '50%', }}
          image={LogoImg}
          // src ="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          title="logo"
        />

        <Typography variant="h6" noWrap component="div" marginLeft={3}>
          HICM Warincamrab
        </Typography>
        <Box flexGrow={1}></Box>
        <Tooltip title="Full Screen">
          <IconButton
            color="inherit"
            aria-label="full screen"
            onClick={handleFullscreen}
            edge="start"
            sx={{ ml: 2, ...(open && { display: 'none' }) }}
          >
            <FullscreenIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Settings">
          <IconButton
            color="inherit"
            aria-label="Settings"
            edge="start"
            sx={{ ml: 2, ...(open && { display: 'none' }) }}
          >
            <Settings />
          </IconButton>
        </Tooltip>

        <Tooltip title="Logout">
          <IconButton
            color="inherit"
            aria-label="logout"
            edge="start"
            sx={{ ml: 2, ...(open && { display: 'none' }) }}
          >
            <Logout />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
