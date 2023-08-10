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
import { Box, Menu, Stack, Typography } from '@mui/material'
import { Grading, Settings, AutoGraph } from '@mui/icons-material'
import logo from '../assets/logo.png'

const drawerWidth = 260

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
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
    // { icon: <AutoGraph />, title: 'Dashboard', nav: '/dashboard' },
    // { icon: <AutoGraph />, title: 'Eclaim', nav: '/eclaim' },
    { icon: <Settings />, title: 'ออกใบเสร็จ Statement', nav: '/reciept' },
    { icon: <Settings />, title: 'รายงาน เพื่อการจัดการ', nav: '/reciept' },
    // { icon: <MailIcon />, title: 'Pie Chart', nav: '/piechart' },
    // { icon: <MailIcon />, title: 'Bar Chart', nav: '/barchart' },
  ]

  const ipMenus = [
    { icon: <InboxIcon />, title: 'IP-REP-STATEMENT', nav: '/ipofc/report' },
    { icon: <MailIcon />, title: 'IP พรบ', nav: '' },
    // { icon: <MailIcon />, title: 'IP LGO', nav: '' },
    // { icon: <MailIcon />, title: 'IP STP ', nav: '' },
  ]

  const opMenus = [
    { icon: <InboxIcon />, title: 'OP-REP-STATEMENT', nav: '/op/report' },
    { icon: <MailIcon />, title: 'OP พรบ', nav: '' },
    { icon: <MailIcon />, title: 'OP Virtual Account', nav: '' },
  ]

  const stmMenus = [
    { icon: <InboxIcon />, title: 'IP OFC', nav: '/stmipofc/report' },
    { icon: <MailIcon />, title: 'IP UCS', nav: '/stmipuc/report' },
    { icon: <MailIcon />, title: 'IP LGO', nav: '' },
    { icon: <MailIcon />, title: 'IP STP ', nav: '' },
  ]
// 
  const feeScheduleMenus = [
    { icon: <MailIcon />, title: 'ANC', nav: '/fs/anc' },
    { icon: <MailIcon />, title: 'ANC ทันตกรรม', nav: '/fs/ancdent' },
    { icon: <MailIcon />, title: 'เคลือบ Fluoride', nav: '/fs/fluoride' },    
    { icon: <MailIcon />, title: 'วางแผนครอบครัว ยาฝัง', nav: '' },
    
  ]
  const drugMenus = [  
    { icon: <MailIcon />, title: 'ยาสมุนไพร', nav: '/fs/herb' },
    { icon: <MailIcon />, title: 'Clopidrogel', nav: '' },
    { icon: <MailIcon />, title: 'SK MI', nav: '/fs/skmi' },
    { icon: <MailIcon />, title: 'SK Stroke', nav: '' },
    { icon: <MailIcon />, title: 'DMISHD', nav: '/fs/dmishd' },
    { icon: <MailIcon />, title: 'INST ฟันปลอม', nav: '/fs/instdent' },
    { icon: <MailIcon />, title: 'Dent รากฟันเทียม', nav: '' },
    { icon: <MailIcon />, title: 'INST', nav: '/fs/inst' },
  ]

  const opEclaimMenus = [
    { icon: <MailIcon />, title: 'UC เปลี่ยนสิทธิทันที', nav: '/fs/changeright' },
    { icon: <MailIcon />, title: 'UCS พิการ (ปกส)', nav: '' },
    { icon: <MailIcon />, title: 'Walk in', nav: '' },
    { icon: <MailIcon />, title: 'AE สิทธิ์ว่าง', nav: '/fs/aenullright' },
    { icon: <MailIcon />, title: 'AE นอกเขต', nav: '/fs/aeoutuc' },    
    { icon: <MailIcon />, title: 'DMISRC', nav: '/fs/dmisrc' },
    { icon: <MailIcon />, title: 'ER คุณภาพ', nav: '/fs/erquality' },
    { icon: <MailIcon />, title: 'UCEP', nav: '/fs/ucep' },  
    { icon: <InboxIcon />, title:'Telemedicine', nav: '/fs/telemed' },
    { icon: <MailIcon />, title: 'Palliative', nav: '/fs/palliative' },
    { icon: <MailIcon />, title: 'CA Anywhere', nav: '/fs/caanywhere' },
    { icon: <MailIcon />, title: 'CA Chemo', nav: '/fs/cachemo' },
  ]

  const acciInsureMenus = [
    { icon: <MailIcon />, title: 'Claim พรบ IPD', nav: '/acciinsure/ip' },
    { icon: <MailIcon />, title: 'บันทึก Claim พรบ IPD', nav: '/acciinsure/addip' },
  ]

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null)
  const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null)
  const [anchorEl4, setAnchorEl4] = React.useState<null | HTMLElement>(null)
  const [anchorEl5, setAnchorEl5] = React.useState<null | HTMLElement>(null)
  const [anchorEl6, setAnchorEl6] = React.useState<null | HTMLElement>(null)

  const openMenu = Boolean(anchorEl)
  const openMenu2 = Boolean(anchorEl2)
  const openMenu3 = Boolean(anchorEl3)
  const openMenu4 = Boolean(anchorEl4)
  const openMenu5 = Boolean(anchorEl5)
  const openMenu6 = Boolean(anchorEl6)

  // Debit-statment
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // statment
  const handleClick4 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl4(event.currentTarget)
  }
  const handleClose4 = () => {
    setAnchorEl4(null)
  }

  // Fee Schedule Menu
  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }

  // op eclaim Menu
  const handleClick3 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl3(event.currentTarget)
  }
  const handleClose3 = () => {
    setAnchorEl3(null)
  }
  // Acci Insure Menu
  const handleClick5 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl5(event.currentTarget)
  }
  const handleClose5 = () => {
    setAnchorEl5(null)
  }

  // instrument eclaim 
  const handleClick6 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl6(event.currentTarget)
  }
  const handleClose6 = () => {
    setAnchorEl6(null)
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
        <Stack direction={'row'} width={'100%'}>
        <img
          src={logo}
          style={{ height: '80px' , paddingLeft: '5px'}}
          alt={'logo'}
          loading="lazy"
          
        />
         
          <Box flexGrow={1}/>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Divider />

      <List>
        {/* Debit - statement */}
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary={'Debit-Statment'} />
        </ListItemButton>
        {/* statement */}
        <ListItemButton onClick={handleClick4}>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary={'Statement Report'} />
        </ListItemButton>

        <Divider />
        {/* // Fee schedule menus  */}
        <ListItemButton onClick={handleClick2}>
          <ListItemIcon>
            <Grading />
          </ListItemIcon>
          <ListItemText primary={'Fee Schedule'} />
        </ListItemButton>
        {/* // Opd Eclaim Menu */}
        <ListItemButton onClick={handleClick3}>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary={'Opd Eclaim'} />
        </ListItemButton>
        <ListItemButton onClick={handleClick6}>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary={'Instrument Drug Eclaim'} />
        </ListItemButton>
        <ListItemButton onClick={()=>navigate('/eclaim/eclaimreport')}>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary={'ECLAIM REPORT'} />
        </ListItemButton>
        {/* // Opd Eclaim Menu */}

        <Divider/>
        <ListItemButton onClick={handleClick5}>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary={'Claim พรบ อุบัติเหตุ'} />
        </ListItemButton>
      </List>

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

      {/* // debit statement submenu*/}
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
      {/*statement submenus*/}
      <Menu
        anchorEl={anchorEl4}
        id="statement-Menu"
        open={openMenu4}
        onClose={handleClose4}
        onClick={handleClose4}
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
        {stmMenus.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(menu.nav)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </Menu>
      {/*fee Schedule submenus*/}
      <Menu
        anchorEl={anchorEl2}
        id="Fee-Schedule-Menu"
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
      {/*opd eclaim submenus*/}
      <Menu
        anchorEl={anchorEl3}
        id="op-eclaim-menu"
        open={openMenu3}
        onClose={handleClose3}
        onClick={handleClose3}
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
        {opEclaimMenus.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(menu.nav)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </Menu>
      {/*instrument drug*/}
      <Menu
        anchorEl={anchorEl6}
        id="op-eclaim-menu"
        open={openMenu6}
        onClose={handleClose6}
        onClick={handleClose6}
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
        {drugMenus.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(menu.nav)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </Menu>
      {/*Acci Insure menu submenus*/}
      <Menu
        anchorEl={anchorEl5}
        id="acci-insure-menu"
        open={openMenu5}
        onClose={handleClose5}
        onClick={handleClose5}
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
        {acciInsureMenus.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(menu.nav)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </Menu>
    </Drawer>
  )
}
