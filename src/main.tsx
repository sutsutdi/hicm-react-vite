import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import '@fontsource/prompt'
import './index.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

import { Provider } from 'react-redux'
import { store } from './store/store'
import { PureLightTheme } from './theme/schemes/PureLightTheme'
import { GreyGooseTheme } from './theme/schemes/GreyGooseTheme'
import { PurpleFlowTheme } from './theme/schemes/PurpleFlowTheme'
import {theme} from './theme/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={'/hicm'}>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)
