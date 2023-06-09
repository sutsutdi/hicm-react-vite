import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MailIcon from '@mui/icons-material/Mail'

import { Badge, Box, Button, Tooltip } from '@mui/material'
import { AccountCircle, Notifications } from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useSelector } from 'react-redux'
import { store, useAppDispatch } from '../store/store'
import { loginSelector, loginStatus } from '../store/slices/loginSlice'
import { useEffect } from 'react'

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

interface HeaderProps {
  open: boolean
  onDrawerOpen: () => void
  logout: () => void
}

export default function AppHeader({ open, onDrawerOpen, logout }: HeaderProps) {
  // const dispatch = useAppDispatch()
  // const loginReducer = useSelector(loginSelector)

  // const success = loginReducer.success
  // const successLogout = false
  // const userLogout = ''

  // const auth = store.getState().loginReducer.success

  const navigate = useNavigate()

  // useEffect(() => {

  //     const element = document.documentElement

  //     element.requestFullscreen()

  // }, [])

  const logoutNotify = () => {
    // toast("Logout !!!");
    // dispatch(loginStatus({ successLogout, userLogout }))
    // navigate('/login')
  }
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{padding: '10px'}}>
        {
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={{ ml:3 , mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        }
        
        <Typography variant="h4" noWrap component="div">
          Warinchamrab Hospital
        </Typography>
        <Box flexGrow={1} />
        <Box display={{ xs: 'none', md: 'flex' }}>
          <IconButton size="large" color="inherit" aria-label="email icon">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit" aria-label="email icon">
            <Badge badgeContent={17} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Box p={2} alignItems={'center'}>
            "User ..."
          </Box>
          <Tooltip title={'Logout '}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-haspopup={true}
              aria-label="account"
              onClick={logoutNotify}
              sx={{ marginRight: '10px' }}
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>

          {/* <Toaster
            position="top-right"
            gutter={8}
            toastOptions={{
              // Define default options
              className: "",
              duration: 2000,
              style: {
                background: "#ce5748",
                color: "#fff",
              },
            }}
          /> */}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
