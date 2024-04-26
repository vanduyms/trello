import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { getDataAPI } from "~/apis/fetchData";
import { useEffect } from "react";
import { useState } from "react";
import LoadingIcon from "~/components/LoadingIcon";

function SearchUser({
  board,
  isSearching,
  setIsSearching,
  emailSearch,
  setEmailSearch,
  userShareAdded,
  setUserShareAdded,
}) {
  const [loading, setLoading] = useState(false);
  const [userSearch, setUserSearch] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let query = `users`;
      if (emailSearch) query = `users?email=${emailSearch}`;
      const res = await getDataAPI(query);
      setUserSearch(res.data);
      setLoading(false);
    };

    isSearching && loadData();
  }, [emailSearch, isSearching]);

  const handleAddUserShare = (user) => {
    const id = user._id;
    if (id === board.ownerUser[0]._id || board.memberIds.includes(id)) return;
    else {
      setUserShareAdded([...userShareAdded, user]);
      setEmailSearch("");
    }
    setIsSearching(false);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 100000,
        width: "100%",
        maxHeight: isSearching && "136px",
        top: "54px",
        left: "0px",

        display: isSearching ? "flex" : "none",
        flexDirection: "column",
        gap: 1.5,
        alignItems: "center",

        overflowY: "scroll",

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
      {userSearch?.length > 0 ? (
        userSearch.map((user) => (
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              width: "100%",
            }}
            key={user._id}
            onClick={() => handleAddUserShare(user)}
          >
            <Avatar src={user.avatar} />
            <Box>
              <Typography>{user.fullName}</Typography>
              <Typography>{`@${user.username}`}</Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography sx={{ alignSelf: "flex-start" }}>
          Cannot find user !
        </Typography>
      )}
    </Box>
  );
}

export default SearchUser;
