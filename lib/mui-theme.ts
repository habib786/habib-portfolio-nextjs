import { createTheme, ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#106A5A' : '#14b8a6',
      light: mode === 'light' ? '#1d8976' : '#2dd4bf',
      dark: mode === 'light' ? '#0a4a3e' : '#0f766e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FACC15',
      light: '#fde047',
      dark: '#eab308',
      contrastText: '#000000',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#0a0a0a',
      paper: mode === 'light' ? '#ffffff' : '#141414',
    },
    text: {
      primary: mode === 'light' ? '#171717' : '#f5f5f5',
      secondary: mode === 'light' ? '#4a4a4a' : '#a3a3a3',
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Outfit", "Inter", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(16, 106, 90, 0.15)',
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: mode === 'light' ? '#0d594b' : '#0d9488',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: mode === 'light' 
            ? '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)' 
            : '0 1px 3px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          border: mode === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)',
        },
      },
    },
  },
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
