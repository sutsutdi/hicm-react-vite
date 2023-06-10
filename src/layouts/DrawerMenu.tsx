import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Menu, MenuItem } from '@mui/material'
import { Logout, PersonAdd, Settings, Grading } from '@mui/icons-material'

const drawerWidth = 240

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

type DrawerMenu = {
  open: boolean
  onDrawerClose: () => void
}

export default function DrawerMenu({ open, onDrawerClose }: DrawerMenu) {
  const theme = useTheme()

  const handleDrawerClose = () => {
    onDrawerClose()
  }

  interface MenuProp {
    icon: React.Component
    title: string
    nav: string
  }

  const menus = [
    { icon: <InboxIcon />, title: 'บัญชีลูกหนี้ ผู้ป่วยนอก Debit OP', nav: '/debitop/opreport' },
    { icon: <InboxIcon />, title: 'บัญชีลูกหนี้ ผู้ป่วยใน  Debit IP', nav: '/debitip/ipreport' },
    { icon: <InboxIcon />, title: 'Stock', nav: '/stock' },
    { icon: <MailIcon />, title: 'Stock Edit', nav: '/stockedit' },
    { icon: <MailIcon />, title: 'Pie Chart', nav: '/piechart' },
    { icon: <MailIcon />, title: 'Bar Chart', nav: '/barchart' },
  ]

  const ipMenus = [
    { icon: <InboxIcon />, title: 'IP OFC', nav: '/ipofc/report' },
    { icon: <MailIcon />, title: 'IP UCS', nav: '/ipuc/report' },
    { icon: <MailIcon />, title: 'IP SSS', nav: '' },
    { icon: <MailIcon />, title: 'IP LGO', nav: '' },
    { icon: <MailIcon />, title: 'IP ต่างด้าว', nav: '' },
    { icon: <MailIcon />, title: 'IP STP ', nav: '' },
  ]

  const opMenus = [
    { icon: <InboxIcon />, title: 'OP OFC', nav: '' },
    { icon: <MailIcon />, title: 'OP UCS', nav: '' },
    { icon: <MailIcon />, title: 'OP SSS', nav: '' },
    { icon: <MailIcon />, title: 'OP LGO', nav: '' },
    { icon: <MailIcon />, title: 'OP ต่างด้าว', nav: '' },
    { icon: <MailIcon />, title: 'OP STP', nav: '' },
  ]

  const feeScheduleMenus = [
    { icon: <InboxIcon />, title: 'Telemedicine', nav: '' },
    { icon: <MailIcon />, title: 'Palliative', nav: '' },
    { icon: <MailIcon />, title: 'ANC', nav: '' },
    { icon: <MailIcon />, title: 'AE', nav: '' },
    { icon: <MailIcon />, title: 'ER คุณภาพ', nav: '' },
   
  ]

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null)

  const openMenu = Boolean(anchorEl)
  const openMenu2 = Boolean(anchorEl2)

  // Debit-statment
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Fee Schedule Menu
  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }

  const navigate = useNavigate()

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary={'Debit-Statment'} />
          </ListItemButton>
        </ListItem>
        <ListItemButton onClick={handleClick2}>
          <ListItemIcon>
            <Grading />
          </ListItemIcon>
          <ListItemText primary={'Fee Schedule'} />
        </ListItemButton>
      </List>
      {/* // debit statement */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {ipMenus.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(menu.nav)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider />

        {opMenus.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(menu.nav)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </Menu>

      {/* fee schedule */}
      <Menu
        anchorEl={anchorEl2}
        id="fee-schedule-menu"
        open={openMenu2}
        onClose={handleClose2}
        onClick={handleClose2}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {feeScheduleMenus.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(menu.nav)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
     

          
      </Menu>


      <Divider />
      <Box>
        <List>
          {menus.map((menu, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(menu.nav)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={menu.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
