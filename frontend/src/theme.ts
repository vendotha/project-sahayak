// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // A light blue, good for dark mode
    },
    background: {
      default: '#121212', // A standard dark background
      paper: '#1e1e1e',   // The color for components like Cards
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;