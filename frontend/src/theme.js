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
          black_white: "#000",
          textCreateBtnColor: "#fff",
          createBtnBg: '#ffffff33',
          createBtnBg_Hovered: '#ffffff4d',
          searchBoxBg: "#ffffff33",
          colorTextColumn: "#172b4d",
          scrollBarColumnBg: "#ced0da",
          scrollBarColumnBg_Hovered: "#bdc3c7",
          bgCard: "white",
          colorAddCardColumn: "#172b4d",
          textButton: "#172b4d",
          bgButtonBoard: "#091e420f",
          bgButtonBoard_Hovered: "#091e4224",
          titleColorBoard: "#44546f",
          bgItemBoard: "#6f777b",
          bgItemBoard_Hovered: "#838c91",
          bgItemAddCardBoard: "#091e420f",
          bgItemAddCardBoard_Hovered: "#a6c5e229",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#9fadbc',
          black_white: "#fff",
          textCreateBtn: "#000",
          createBtnBg: '#579dff',
          createBtnBg_Hovered: '#85b8ff',
          searchBoxBg: "#transparent",
          colorTextColumn: "#B6C2CF",
          scrollBarColumnBg: "#1e1e1e",
          scrollBarColumnBg_Hovered: "#3b3b3a",
          bgCard: "#1e1e1e",
          colorAddCardColumn: "white",
          textButton: "#b6c2cf",
          bgButtonBoard: "#a1bdd914",
          bgButtonBoard_Hovered: "#a6c5e229",
          titleColorBoard: "#9fadbc",
          bgItemBoard: "#6f777b",
          bgItemBoard_Hovered: "#838c91",
          bgItemAddCardBoard: "#282d33",
          bgItemAddCardBoard_Hovered: "#a6c5e229",
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
    },
  },
});

export default theme;