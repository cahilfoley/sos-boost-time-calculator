import { StrictMode } from 'react'
import { render } from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'

import App from './App'

const theme = createTheme({
  palette: { mode: 'dark' },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
})

const responsiveTheme = responsiveFontSizes(theme)

const rootElement = document.getElementById('root')
render(
  <StrictMode>
    <ThemeProvider theme={responsiveTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
  rootElement,
)
