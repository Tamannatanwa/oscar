// theme.js
import { createTheme } from '@mui/material/styles';
import { breakpoints } from './constant';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5c0a',
    },
    secondary: {
      main: '#f8f8f8',
    },
    text: {
      primary: '#000',
      secondary: 'gray',
    },
    background: {
      default: '#E6E6FA', // Set your desired background color here
    },
  },
  typography: {
    fontFamily: 'Fraunces, Arial, sans-serif',
    h1: {
      fontFamily: 'inherit',
      fontSize: '3rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
      '@media (max-width:900px)': {
        fontSize: '2.5rem',
      },
    },
    h4: {
      fontFamily: 'inherit',
      fontSize: '2rem',
    },
    h5: {
      fontFamily: 'DM Sans',
      fontWeight: 'bold',
    },
    body1: {
      fontFamily: 'inherit',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#000',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'gray',
        },
      },
    },
  },
  breakpoints: breakpoints,
});

export default theme;
