/* eslint-disable no-extra-boolean-cast */
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useState } from "react";
import { ClickAwayListener, Typography, useMediaQuery } from "@mui/material";
import RecentlyViewed from "~/components/Board/RecentlyViewed";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchBoardTitle } from "~/redux/actions/boardAction";

import CircularProgress from "@mui/material/CircularProgress";

function Search({ boards }) {
  const [searchValue, setSearchValue] = useState("");

  const tabletViewPort = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [showBoxSearch1, setShowBoxSearch1] = useState(false);
  const [showBoxSearch2, setShowBoxSearch2] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    searchValue && dispatch(searchBoardTitle(searchValue));
  }, [searchValue, dispatch]);

  if (tabletViewPort)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "4px",
          borderRadius: "50%",
          "&:hover": { backgroundColor: "#cccccc3e" },
          cursor: "pointer",
          color: "primary.main",
        }}
        onClick={() => setShowBoxSearch1(true)}
      >
        <SearchIcon />
        {showBoxSearch1 && (
          <Box
            sx={{
              position: "fixed",
              top: "60px",
              width: "100%",
              left: 0,
              height: "100%",
              backgroundColor: "primary.appBarBgColor",
              zIndex: 20,

              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              margin: "auto",
              padding: 5,

              gap: 2,
            }}
          >
            <Typography variant="h5">Search</Typography>

            <TextField
              id="outlined-search"
              type="search"
              size="small"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClick={() => setShowBoxSearch1(true)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIcon
                      fontSize="small"
                      sx={{
                        color: searchValue ? "white" : "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => setSearchValue("")}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "100%",
                bgcolor: "primary.searchBoxBg",
                "& label": { color: "white" },
                "& input": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h7"
                sx={{
                  fontSize: "14px",
                  color: "primary.main",
                  mb: 1,
                  fontWeight: 800,
                }}
              >
                RECENT
              </Typography>
              {boards?.loading && (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {!!searchValue ? (
                <RecentlyViewed boards={boards?.boards} />
              ) : (
                <RecentlyViewed boards={boards?.boardsRecentlyViewed} />
              )}
            </Box>
          </Box>
        )}
      </Box>
    );
  else
    return (
      <ClickAwayListener onClickAway={() => setShowBoxSearch2(false)}>
        <Box sx={{ display: "flex" }}>
          <TextField
            id="outlined-search"
            label="Search"
            type="search"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={() => setShowBoxSearch2(true)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    fontSize="small"
                    sx={{
                      color: searchValue ? "white" : "transparent",
                      cursor: "pointer",
                    }}
                    onClick={() => setSearchValue("")}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: "120px",
              maxWidth: "180px",
              bgcolor: "primary.searchBoxBg",
              "& label": { color: "white" },
              "& input": { color: "white" },
              "& label.Mui-focused": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
          />
          {showBoxSearch2 && (
            <Box
              sx={{
                position: "absolute",
                minWidth: "286px",
                maxWidth: "436px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "6px",
                borderColor: "primary.main",
                top: "50px",
                backgroundColor: "primary.appBarBgColor",
                zIndex: 15,
                padding: "4px 8px",
              }}
            >
              <Typography
                variant="h7"
                sx={{ fontSize: "12px", color: "primary.main" }}
              >
                RECENT
              </Typography>
              {boards?.loading && (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {!!searchValue ? (
                <RecentlyViewed boards={boards?.boards} />
              ) : (
                <RecentlyViewed boards={boards?.boardsRecentlyViewed} />
              )}
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    );
}

export default Search;
