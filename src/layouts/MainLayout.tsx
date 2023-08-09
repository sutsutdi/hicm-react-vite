import React, {  } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import AppHeader from './AppHeader'
import DrawerMenu from './DrawerMenu'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'

import DebitEditPage from '../pages/DebitEdit'

import { BarChartPage } from '../pages/BarChart'
import { PieChartPage } from '../pages/PieChart'

import MainPage from '../pages/MainPage'
import StmIpOfcPage from '../pages/statements/StmIpOfc'
import ReportIpAllPage from '../pages/reports/ReportIpAll'

import ReportOpPage from '../pages/reports/reportop/ReportOp'

import FsErQualityPage from '../pages/feeschedules/FsErQuality'
import FsTelemedPage from '../pages/feeschedules/FsTelemed'
import ReportIpPage from '../pages/reports/reportip/ReportIp'
import IpDashboardPage from '../pages/dashboard/IpDashboard'
import EclaimItemPage from '../pages/eclaim/EclaimItems'
import RecieptInputPage from '../pages/reciept/ReceiptInput'
import AcciInsurePage from '../pages/acciinsure/AcciInsurePage/AcciInsurePage'
import AcciInsureIpAddPage from '../pages/acciinsure/IpCreatePage/AcciInsureIpAddPage'
import FsCaAnyWherePage from '../pages/feeschedules/FsCaAnyWhere'
import FsCaChemoPage from '../pages/feeschedules/FsCaChemo'
import FsPalliativePage from '../pages/feeschedules/FsPalliative'
import FsUcepPage from '../pages/feeschedules/FsUcep'
import FsChangeRightPage from '../pages/feeschedules/FsChangeRight'
import FsAncPage from '../pages/feeschedules/FsAnc'
import FsAeNullRightPage from '../pages/feeschedules/FsAeNullRight'
import EclaimReportPage from './../pages/eclaim/EclaimReport';

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function MainLayout() {
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
    // const element = document.documentElement
    // element.requestFullscreen()
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }


  

  return (
    <>
      <Box sx={{ display: 'flex', padding: '25px' }}>
        {/* <CssBaseline /> */}
        <AppHeader
          open={open}
          onDrawerOpen={handleDrawerOpen}
          logout={handleDrawerClose}
        />
        <DrawerMenu open={open} onDrawerClose={handleDrawerClose} />
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/debitip/ipreport" element={<ReportIpAllPage />} />
            <Route path="/ipofc/report" element={<ReportIpPage/>} />
            {/* <Route path="/ipofc/report" element={<ReportIpPage  acctype = 'ipofc' title = 'ผู้ป่วยใน จ่ายตรงกรมบัญชีกลาง '/>} /> */}
            {/* <Route path="/ipuc/report" element={<ReportIpPage acctype = 'ipuc' title = 'ผู้ป่วยใน UCS '/>} /> */}
            <Route path="/op/report" element={<ReportOpPage />} />
            {/* <Route path="/opofc/report" element={<ReportOpOfcPage />} /> */}
            {/* <Route path="/ipofc/report" element={<ReportIpOfcPage />} /> */}
            <Route path="/stmipofc/report" element={<StmIpOfcPage />} />
            <Route path="/debit/edit" element={<DebitEditPage />} />
            <Route path="/fs/erquality" element={<FsErQualityPage />} />
            <Route path="/fs/ucep" element={<FsUcepPage />} />
            <Route path="/fs/telemed" element={<FsTelemedPage />} />
            <Route path="/fs/caanywhere" element={<FsCaAnyWherePage />} />
            <Route path="/fs/cachemo" element={<FsCaChemoPage />} />
            <Route path="/fs/palliative" element={<FsPalliativePage />} />
            <Route path="/fs/anc" element={<FsAncPage />} />
            <Route path="/fs/changeright" element={<FsChangeRightPage />} />
            <Route path="/fs/aenullright" element={<FsAeNullRightPage />} />
            <Route path="/dashboard" element={<IpDashboardPage />} />
            <Route path="/eclaim" element={<EclaimItemPage />} />
            <Route path="/eclaim/eclaimreport" element={<EclaimReportPage />} />
            <Route path="/reciept" element={<RecieptInputPage />} />
            <Route path="/acciinsure" element={<AcciInsurePage />} />
            <Route path="/acciinsure/ip" element={<AcciInsurePage />} />
            <Route path="/acciinsure/addip" element={<AcciInsureIpAddPage />} />      
            <Route path="/barchart" element={<BarChartPage />} />
            <Route path="/piechart" element={<PieChartPage />} />
            {/* <Route path="/" element={<Navigate to={'/login'} />} /> */}
            <Route path="/" element={<Navigate to={'/main'} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Main>
      </Box>
    </>
  )
}
