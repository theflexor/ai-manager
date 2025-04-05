'use client';

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

