import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.boardContentHeight,
        backgroundColor: "primary.main",
        p: "10px 0",
      }}
    >
      <Box
        sx={{
          backgroundColor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          color: "primary.colorTextColumn",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {/* Box column 1 */}
        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
                5
              )})`,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101204" : "#f1f2f4",
            ml: 2,
            borderRadius: "6px",
            color: "primary.colorTextColumn",
          }}
        >
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Column Title
            </Typography>

            <Box>
              <Button
                sx={{
                  padding: "0px 4px",
                  minWidth: "max-content !important",
                  color: "primary.colorTextColumn",
                  "& .MuiButton-endIcon": {
                    mr: 0,
                    ml: 0,
                    padding: "0px 4px",
                  },
                }}
                id="basic-button-recent"
                aria-controls={open ? "basic-menu-recent" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<MoreHorizIcon />}
              ></Button>
              <Menu
                id="basic-menu-recent"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button-recent",
                }}
                sx={{
                  "& .MuiList-root": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light" ? "#0f0f0f" : "#1d2125",
                  },
                }}
              >
                <MenuList
                  dense
                  sx={{
                    color: "primary.main",
                  }}
                >
                  <MenuItem>
                    <ListItemText>Add card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemText>Copy list</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemText>Move list</ListItemText>
                  </MenuItem>

                  <Divider />

                  <MenuItem>
                    <ListItemText>Create a rule</ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              p: "0 5px",
              m: "0 5px",
              overflowX: "hidden",
              overflowY: "auto",
              maxHeight: (theme) =>
                `calc(${
                  theme.trelloCustom.boardContentHeight
                } - ${theme.spacing(
                  5
                )} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_HEADER_HEIGHT})`,
              "&::-webkit-scrollbar-thumb": (theme) => ({
                backgroundColor: theme.palette.primary.scrollBarColumnBg,
              }),
              "&::-webkit-scrollbar-thumb:hover": (theme) => ({
                backgroundColor:
                  theme.palette.primary.scrollBarColumnBg_Hovered,
              }),
            }}
          >
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                "&:last-child": { p: 1.5 },
                overflow: "unset",
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                title="green iguana"
              />
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                }}
              >
                <Typography variant="h5">Lizard</Typography>
              </CardContent>
              <CardActions sx={{ p: "0 4px 8px 4px" }}>
                <Button
                  size="small"
                  sx={{ color: "primary.colorTextColumn" }}
                  startIcon={<GroupIcon />}
                >
                  20
                </Button>
                <Button
                  size="small"
                  sx={{ color: "primary.colorTextColumn" }}
                  startIcon={<CommentIcon />}
                >
                  15
                </Button>
                <Button
                  size="small"
                  sx={{ color: "primary.colorTextColumn" }}
                  startIcon={<AttachmentIcon />}
                >
                  10
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                  "&:last-child": { p: 1.5 },
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                  "&:last-child": { p: 1.5 },
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                  "&:last-child": { p: 1.5 },
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                  "&:last-child": { p: 1.5 },
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                  "&:last-child": { p: 1.5 },
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                  "&:last-child": { p: 1.5 },
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                  "&:last-child": { p: 1.5 },
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                  "&:last-child": { p: 1.5 },
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Button
              sx={{
                color: "primary.colorTextColumn",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
              startIcon={<AddIcon />}
            >
              Add a card
            </Button>
            <Tooltip title="Create from template...">
              <Button
                sx={{
                  padding: "0px 4px",
                  minWidth: "max-content !important",
                  color: "primary.colorTextColumn",
                  // "& .MuiButtonBase-root": {
                  //   min-width: "max-content !important"
                  // },
                  "& .MuiButton-endIcon": {
                    mr: 0,
                    ml: 0,
                    padding: "6px 4px",
                  },
                }}
                id="basic-button-recent"
                aria-controls={open ? "basic-menu-recent" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<AddToPhotosIcon />}
              ></Button>
            </Tooltip>
          </Box>
        </Box>

        {/* Box column 2 */}
        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
                5
              )})`,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101204" : "#f1f2f4",
            ml: 2,
            borderRadius: "6px",
            color: "primary.colorTextColumn",
          }}
        >
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Column Title
            </Typography>

            <Box>
              <Button
                sx={{
                  padding: "0px 4px",
                  minWidth: "max-content !important",
                  color: "primary.colorTextColumn",
                  "& .MuiButton-endIcon": {
                    mr: 0,
                    ml: 0,
                    padding: "0px 4px",
                  },
                }}
                id="basic-button-recent"
                aria-controls={open ? "basic-menu-recent" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<MoreHorizIcon />}
              ></Button>
              <Menu
                id="basic-menu-recent"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button-recent",
                }}
                sx={{
                  "& .MuiList-root": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light" ? "#0f0f0f" : "#1d2125",
                  },
                }}
              >
                <MenuList
                  dense
                  sx={{
                    color: "primary.main",
                  }}
                >
                  <MenuItem>
                    <ListItemText>Add card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemText>Copy list</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemText>Move list</ListItemText>
                  </MenuItem>

                  <Divider />

                  <MenuItem>
                    <ListItemText>Create a rule</ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              p: "0 5px",
              m: "0 5px",
              overflowX: "hidden",
              overflowY: "auto",
              maxHeight: (theme) =>
                `calc(${
                  theme.trelloCustom.boardContentHeight
                } - ${theme.spacing(
                  5
                )} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_HEADER_HEIGHT})`,
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ced0da",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#bdc3c7",
              },
            }}
          >
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                "&:last-child": { p: 1.5 },
                overflow: "unset",
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                title="green iguana"
              />
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                }}
              >
                <Typography variant="h5">Lizard</Typography>
              </CardContent>
              <CardActions sx={{ p: "0 4px 8px 4px" }}>
                <Button
                  size="small"
                  sx={{ color: "primary.colorTextColumn" }}
                  startIcon={<GroupIcon />}
                >
                  20
                </Button>
                <Button
                  size="small"
                  sx={{ color: "primary.colorTextColumn" }}
                  startIcon={<CommentIcon />}
                >
                  15
                </Button>
                <Button
                  size="small"
                  sx={{ color: "primary.colorTextColumn" }}
                  startIcon={<AttachmentIcon />}
                >
                  10
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                maxWidth: 345,
                color: "primary.colorTextColumn",
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent
                sx={{
                  color: "primary.colorTextColumn",
                  p: 1.5,
                  "&:last-child": { p: 1.5 },
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Button
              sx={{
                color: "primary.colorTextColumn",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
              startIcon={<AddIcon />}
            >
              Add a card
            </Button>
            <Tooltip title="Create from template...">
              <Button
                sx={{
                  padding: "0px 4px",
                  minWidth: "max-content !important",
                  color: "primary.colorTextColumn",
                  // "& .MuiButtonBase-root": {
                  //   min-width: "max-content !important"
                  // },
                  "& .MuiButton-endIcon": {
                    mr: 0,
                    ml: 0,
                    padding: "6px 4px",
                  },
                }}
                id="basic-button-recent"
                aria-controls={open ? "basic-menu-recent" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<AddToPhotosIcon />}
              ></Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BoardContent;
