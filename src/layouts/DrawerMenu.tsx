import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import { Logout, PersonAdd, Settings,Grading } from "@mui/icons-material";


const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type DrawerMenu = {
  open: boolean;
  onDrawerClose: () => void;
};

export default function DrawerMenu({ open, onDrawerClose }: DrawerMenu) {
  const theme = useTheme();

  const handleDrawerClose = () => {
    onDrawerClose();
  };

  interface MenuProp {
    icon: React.Component;
    title: string;
    nav: string;
  }

  const menus = [
    {icon: <InboxIcon/>,title: "Stock" , nav: "/stock"},
    {icon: <MailIcon/>,title: "Stock Edit" , nav: "/stockedit"},
    {icon: <MailIcon/>,title: "Pie Chart" , nav: "/piechart"},
    {icon: <MailIcon/>,title: "Bar Chart" , nav: "/barchart"},
  ]


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);
  const openMenu2 = Boolean(anchorEl2);

  // Debit-statment
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fee Schedule Menu
  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  const navigate = useNavigate()

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        
          <ListItem  disablePadding>
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
        <MenuItem onClick={()=>navigate('/report')}>
          <Avatar /> IPD จ่ายตรง
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> OPD จ่ายตรง
        </MenuItem>
        <Divider />
        <MenuItem onClick={()=>navigate('/ipuc/report')}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          IP UCS 
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          OP UCS
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          IP SSS
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          OP SSS
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          IP STP
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          OP STP
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          IP LGO
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          OP LGO
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          IP ต่างด้าว
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          OP ต่างด้าว
        </MenuItem>
       
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
        <MenuItem onClick={()=>alert('Telemed')}>
          <Avatar /> Telemed
        </MenuItem>
        <MenuItem onClick={handleClose2}>
          <Avatar /> ER คุณภาพ
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose2}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          UC 
        </MenuItem>
        <MenuItem onClick={handleClose2}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          ประกันสังคม
        </MenuItem>
        <MenuItem onClick={handleClose2}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>


      <Divider />

      <Box>
      
      <List>
        {menus.map((menu, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={()=>navigate(menu.nav)}>
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
  );
}
