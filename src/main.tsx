import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import '@fontsource/prompt'
import './index.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { deDE } from '@mui/x-date-pickers/locales'

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#0a7a7a',
      },
      
    },
    typography: {
      fontFamily: 'Prompt',
    },
  },
  deDE
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ThemeProvider>
)
