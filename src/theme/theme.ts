import { createTheme } from '@mui/material/styles';

export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};
const theme = createTheme({
  spacing: 4,
  breakpoints: breakpoints,
  components: {},
});

export default theme;
