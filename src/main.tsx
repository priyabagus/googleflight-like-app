import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router'
import AppRoutes from './AppRoutes.tsx'

/** dayjs */
import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
dayjs.extend(durationPlugin)

let customTheme = createTheme({
  palette: {
    primary: {
      main: '#008080'
    },
    secondary: {
      main: '#cae2e4'
    }
  },

  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: 400
    },
    h2: {
      fontSize: '2rem'
    },
    h3: {
      fontSize: '1.5rem'
    }
  }
})

customTheme = responsiveFontSizes(customTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
)
