import { createTheme } from '@mui/material/styles';

const getTheme = (mode = 'light') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#734a91',
      light: '#a87bc7',
      dark: '#4e2e6e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#8a4bb8',
      light: '#a87bc7',
      dark: '#734a91',
      contrastText: '#fff',
    },
    background: mode === 'dark'
      ? { default: '#1a1523', paper: '#241a32' }
      : { default: '#f1d7ff', paper: '#ffffff' },
    text: mode === 'dark'
      ? { primary: '#f1d7ff', secondary: '#a87bc7' }
      : { primary: '#2e2140', secondary: '#5a357a' },
    success: {
      main: '#7bc7a8', light: '#a8e6c8', dark: '#4b9f7f', contrastText: '#1f2d2a',
    },
    warning: {
      main: '#ffb74d', light: '#ffd280', dark: '#f57c00', contrastText: '#3b2a00',
    },
    info: {
      main: '#a87bc7', light: '#e0b0ff', dark: '#734a91', contrastText: '#2e2140',
    },
    error: {
      main: '#d96083', light: '#f29ab4', dark: '#b03b5d', contrastText: '#3d0c1b',
    },
    divider: mode === 'dark' ? 'rgba(168,123,199,0.18)' : 'rgba(115, 74, 145, 0.15)',
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: 'Poppins, "Segoe UI", Roboto, Arial, sans-serif',
    h1: { fontWeight: 700, letterSpacing: 0.2 },
    h2: { fontWeight: 700, letterSpacing: 0.2 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: '0 8px 24px rgba(115, 74, 145, 0.12)' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 14, boxShadow: '0 10px 28px rgba(115, 74, 145, 0.14)' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 16,
          '&:focus-visible': {
            outline: '3px solid #a87bc7',
            outlineOffset: '2px',
            background: 'rgba(168,123,199,0.10)',
          },
        },
        containedPrimary: {
          boxShadow: '0 6px 16px rgba(115, 74, 145, 0.24)',
          '&:hover': { boxShadow: '0 8px 22px rgba(115, 74, 145, 0.28)' },
        },
        outlinedPrimary: {
          borderColor: 'rgba(115, 74, 145, 0.55)',
          color: '#5a357a',
          '&:hover': { borderColor: 'rgba(115, 74, 145, 0.8)', background: 'rgba(232, 213, 246, 0.35)' },
        },
        outlinedSecondary: {
          borderColor: 'rgba(138, 75, 184, 0.55)',
          color: '#5a357a',
          '&:hover': { borderColor: 'rgba(138, 75, 184, 0.8)', background: 'rgba(232, 213, 246, 0.35)' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 10 },
        notchedOutline: { borderColor: 'rgba(115, 74, 145, 0.25)' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: '0 8px 22px rgba(115, 74, 145, 0.14)' },
        standardInfo: { backgroundColor: '#f1d7ff', color: '#4e2e6e' },
      },
    },
    MuiTooltip: {
      styleOverrides: { tooltip: { borderRadius: 8 } },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: mode === 'dark' ? 'rgba(168,123,199,0.18)' : 'rgba(115, 74, 145, 0.15)' } },
    },
  },
});

export default getTheme;
