import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '60px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#fff',
          textCreateBtnColor: "#fff",
          createBtnBg: '#ffffff33',
          createBtnBg_Hovered: '#ffffff4d',
          searchBoxBg: "#ffffff33",
          colorTextColumn: "#172b4d",
          scrollBarColumnBg: "#ced0da",
          scrollBarColumnBg_Hovered: "#bdc3c7",
          bgCard: "white",
          colorAddCardColumn: "#172b4d"
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#9fadbc',
          textCreateBtn: "#000",
          createBtnBg: '#579dff',
          createBtnBg_Hovered: '#85b8ff',
          searchBoxBg: "#transparent",
          colorTextColumn: "#B6C2CF",
          scrollBarColumnBg: "#1e1e1e",
          scrollBarColumnBg_Hovered: "#3b3b3a",
          bgCard: "#1e1e1e",
          colorAddCardColumn: "white"
        },
      },
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            // backgroundColor: '#00b894',
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
          textTransform: 'none'
        })
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: "0.875rem",
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main
            }
          },
          '& fieldset': {
            borderWidth: '1px !important'
          }
        })
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.875rem"
          }
        }
      }
    }
  },
});

export default theme;