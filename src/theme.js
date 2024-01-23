import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '48px',
    boardBarHeight: '56px',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#216E4E',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#000',
        },
      },
    }
  }
});

export default theme;