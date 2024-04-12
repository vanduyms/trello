import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { getDataAPI } from "~/apis/fetchData";
import { useEffect } from "react";
import { useState } from "react";
import LoadingIcon from "~/components/LoadingIcon";

function SearchUser({
  board,
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
  const handleAddUserShare = (id) => {
    if (id === board.ownerUser[0]._id || board.memberIds.includes(id)) return;
    else {
      setUserShareAdded([...userShareAdded, user]);
      setEmailSearch("");
    }
  };

  if (emailSearch) {
    return (
      <Box
        sx={{
          position: "absolute",
          zIndex: 100000,
          width: "100%",
          top: "54px",
          left: "0px",

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
        {loading && <LoadingIcon />}
        {user.email ? (
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              width: "100%",
            }}
            onClick={() => handleAddUserShare(user._id)}
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
