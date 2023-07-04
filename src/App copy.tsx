import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import AppHeader from './layouts/AppHeader'
import DrawerMenu from './layouts/DrawerMenu'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import StockPage from './pages/StockPage'
import { useSelector } from 'react-redux'
import { loginSelector } from './store/slices/loginSlice'
import PublicRoutes from './router/public.routes'
import ProtectedRoutes from './router/protected.routes'
import ReportIpAllPage from './pages/ReportIpAll'
import ReportIpOfcPage from './pages/ReportIpOfc'
import ReportOpOfcPage from './pages/ReportOpOfc'
import ReportIpUcPage from './pages/ReportIpUc'
import DebitEditPage from './pages/DebitEdit'
import FsErQualityPage from './pages/FsErQuality'
import FsTelemedPage from './pages/FsTelemed'
import { BarChartPage } from './pages/BarChart'
import { PieChartPage } from './pages/PieChart'
import NotFoundPage from './pages/NotFoundPage'
import MainPage from './pages/MainPage'

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

export default function App() {
  // const dispatch = useAppDispatch()
  const loginReducer = useSelector(loginSelector)

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  // setLoginSuccess(loginReducer.success)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {
        <AppHeader
          open={open}
          onDrawerOpen={handleDrawerOpen}
          logout={handleDrawerClose}
        />
      }
      {<DrawerMenu open={open} onDrawerClose={handleDrawerClose} />}
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          {/* <Route path="/" element={<PublicRoutes />}> */}
           
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          {/* </Route> */}
          {/* <Route path="/" element={<ProtectedRoutes />}> */}
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/debitip/ipreport" element={<ReportIpAllPage />} />
            <Route path="/ipofc/report" element={<ReportIpOfcPage />} />
            <Route path="/opofc/report" element={<ReportOpOfcPage />} />
            <Route path="/ipuc/report" element={<ReportIpUcPage />} />
            <Route path="/debit/edit" element={<DebitEditPage />} />
            <Route path="/fs/erquality" element={<FsErQualityPage />} />
            <Route path="/fs/telemed" element={<FsTelemedPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/barchart" element={<BarChartPage />} />
            <Route path="/piechart" element={<PieChartPage />} />
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route path="*" element={<NotFoundPage />} />
          {/* </Route> */}
        </Routes>
      </Main>
    </Box>
  )
}

const NotFound = () => (
  <>
    <Typography variant="h4">404 Not Found Page</Typography>
  </>
)
