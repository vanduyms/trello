import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar";
import EditProfile from "./Profile";

function Profile() {
  const { auth, boards } = useSelector((state) => state);
  const user = auth.userInfo;
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar auth={auth} boards={boards} />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          padding: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 2,
            paddingY: 2.5,
          }}
        >
          <Avatar src={user.avatar} sx={{ width: 48, height: 48 }} />
          <Box>
            <Typography variant="h5">{user?.fullName}</Typography>
            <Typography variant="h7">{`@${user?.username}`}</Typography>
          </Box>
        </Box>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  "& .MuiButtonBase-root": {
                    color: "primary.tabTextColor",
                    "& .Mui-selected": {
                      color: "primary.tabTextColor_Focused",
                    },
                    "&:focus": {
                      color: "primary.tabTextColor_Focused",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "primary.tabTextColor_Focused",
                  },
                }}
              >
                <Tab id="test" label="Profile" value="1" />
                <Tab label="Activity" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <EditProfile auth={auth} user={user} />
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
