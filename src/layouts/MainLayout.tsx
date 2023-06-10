import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./AppHeader";
import DrawerMenu from "./DrawerMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import StockEditPage from "../pages/StockEditPage";
import StockCreatePage from "../pages/StockCreatePage";
import StockPage from "../pages/StockPage";
import { BarChartPage } from "../pages/BarChart";
import { PieChartPage } from "../pages/PieChart";
import ReportIpUcPage from "../pages/ReportIpUc";
import ReportIpOfcPage from "../pages/ReportIpOfc";


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


export default function MainLayout() {
 

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppHeader open={open} onDrawerOpen={handleDrawerOpen} />
        <DrawerMenu open={open} onDrawerClose={handleDrawerClose} />
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/ipofc/report" element={<ReportIpOfcPage />} />
            <Route path="/ipuc/report" element={< ReportIpUcPage />} />
            <Route path="/stockcreate" element={<StockCreatePage />} />
            <Route path="/stockedit" element={<StockEditPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/barchart" element={<BarChartPage/>} />
            <Route path="/piechart" element={<PieChartPage/>} />
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Main>
      </Box>
    </>
  );
}
