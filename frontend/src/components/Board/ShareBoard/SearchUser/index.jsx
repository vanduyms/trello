import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { getDataAPI } from "~/apis/fetchData";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function SearchUser({
  emailSearch,
  setEmailSearch,
  userShareAdded,
  setUserShareAdded,
}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await getDataAPI(`users?email=${emailSearch}`);
      setUser(res.data);
      setLoading(false);
    };

    loadData();
  }, [emailSearch]);

  const handleAddUserShare = () => {
    setUserShareAdded([...userShareAdded, user]);
    console.log(userShareAdded);
    setEmailSearch("");
  };

  if (emailSearch) {
    return (
      <Box
        sx={{
          position: "absolute",
          zIndex: 100000,
          width: "100%",

          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",

          backgroundColor: "primary.widgetBgColor",

          boxShadow: 2,
          padding: 2,
          mt: 0.5,
          borderRadius: 1,

          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "primary.colorTextColumn",
        }}
      >
        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        )}
        {user.email ? (
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              width: "100%",
            }}
            onClick={handleAddUserShare}
          >
            <Avatar src={user.avatar} />
            <Box>
              <Typography>{user.fullName}</Typography>
              <Typography>{`@${user.username}`}</Typography>
            </Box>
          </Box>
        ) : (
          !loading && <Typography>Cannot found user!</Typography>
        )}
      </Box>
    );
  }
}

export default SearchUser;
