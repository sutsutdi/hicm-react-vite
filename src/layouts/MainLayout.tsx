import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

import AppHeader from './AppHeader'
import DrawerMenu from './DrawerMenu'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'


import { BarChartPage } from '../pages/BarChart'
import { PieChartPage } from '../pages/PieChart'

import MainPage from '../pages/MainPage'
import StmIpOfcPage from '../pages/statements/StmIpOfc'

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
import EclaimReportPage from './../pages/eclaim/EclaimReport'
// import FsAeOutUcPage from '../pages/feeschedules/FsAeOutUc'
// import FsSkMiPage from '../pages/feeschedules/FsSkMi'
import FsHerbPage from '../pages/feeschedules/FsHerb'
import ReportOpUcCrPage from '../pages/reports/reportopuccr/ReportOpUcCr'
import DebitIpPage from '../pages/debit/DebitIp'
import DebitOpPage from '../pages/debit/DebitOp'
import StmRepPage from '../pages/statements/Stm_rep'
// import FsFluoridePage from '../pages/feeschedules/FsFluoride'
// import FsInstDentPage from '../pages/feeschedules/FsInstDent'
// import FsDmisRcPage from '../pages/feeschedules/FsDmisRc'
// import FsDmisHdPage from '../pages/feeschedules/FsDmisHd'
// import FsInstPage from '../pages/feeschedules/FsInst'
// import FsAncDentPage from '../pages/feeschedules/FsAncDent'

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
            <Route path="/ip/report" element={<ReportIpPage />} />
            <Route path="/op/report" element={<ReportOpPage />} />
            <Route path="/op/reportopuccr" element={<ReportOpUcCrPage />} />
            <Route path="/stmipofc/report" element={<StmIpOfcPage />} />
            <Route path="/mapstmrep" element={<StmRepPage />} />
            <Route path="/debitip" element={<DebitIpPage />} />
            <Route path="/debitop" element={<DebitOpPage />} />
            <Route path="/fs/erquality" element={<FsErQualityPage />} />
            <Route path="/fs/ucep" element={<FsUcepPage />} />
            <Route path="/fs/telemed" element={<FsTelemedPage />} />
            <Route path="/fs/caanywhere" element={<FsCaAnyWherePage />} />
            <Route path="/fs/cachemo" element={<FsCaChemoPage />} />
            <Route path="/fs/palliative" element={<FsPalliativePage />} />
            <Route path="/fs/anc" element={<FsAncPage />} />
            {/* <Route path="/fs/ancdent" element={<FsAncDentPage />} /> */}
            <Route path="/fs/changeright" element={<FsChangeRightPage />} />
            <Route path="/fs/aenullright" element={<FsAeNullRightPage />} />
            {/* <Route path="/fs/aeoutuc" element={<FsAeOutUcPage />} /> */}
            {/* <Route path="/fs/skmi" element={<FsSkMiPage />} /> */}
            <Route path="/fs/herb" element={<FsHerbPage />} />
            {/* <Route path="/fs/fluoride" element={<FsFluoridePage />} />
            <Route path="/fs/instdent" element={<FsInstDentPage />} /> */}
            <Route path="/fs/stp" element={<FsAeNullRightPage />} />
            {/* <Route path="/fs/dmisrc" element={<FsDmisRcPage />} /> */}
            {/* <Route path="/fs/dmishd" element={<FsDmisHdPage />} />
            <Route path="/fs/inst" element={<FsInstPage />} />            */}
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
