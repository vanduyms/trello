import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { userUpdate } from "~/redux/actions/authAction";
import { toast } from "react-toastify";

function EditProfile({ user }) {
  const [username, setUsername] = useState(user?.username);
  const [fullName, setFullName] = useState(user?.fullName);
  const [bio, setBio] = useState(user?.bio ? user?.bio : "");

  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(user?.avatar);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
    } else {
      setAvatar("");
    }
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const handleUpdateProfile = () => {
    const id = user._id;
    const data = {
      username: username,
      fullName: fullName,
      bio: bio,
      avatar: avatar,
    };
    dispatch(userUpdate({ id, data, toast }));
  };

  return (
    <Box
      sx={{
        width: "35%",
        display: "flex",
        m: "auto",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">Manage your personal information</Typography>
      <Typography variant="h6">About</Typography>
      <Divider />
      <FormGroup
        sx={{
          display: "flex",
          gap: 2,
          "& .MuiInputBase-input": {
            padding: "8px 12px",
            color: "primary.colorText",
          },
          "& .MuiInputBase-multiline": {
            padding: "0",
          },
          "& .MuiTypography-root": {
            paddingY: "6px",
            fontSize: "16px",
          },
        }}
      >
        <FormControl variant="standard">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h7">Avatar</Typography>
            <Button component="label" sx={{ fontWeight: 450 }}>
              Upload
              <VisuallyHiddenInput
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleUploadImage}
              />
            </Button>
          </Box>
          <Avatar
            src={avatar}
            sx={{ margin: "auto", width: 120, height: 120 }}
          />
        </FormControl>
        <FormControl variant="standard">
          <Typography variant="h7">Username</Typography>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard">
          <Typography variant="h7">Full name</Typography>
          <TextField
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard">
          <Typography variant="h7">Bio</Typography>
          <TextField
            multiline
            minRows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "primary.createBtnBg",
            "&:hover": {
              backgroundColor: "primary.createBtnBg_Hovered",
            },
          }}
          onClick={handleUpdateProfile}
        >
          Save
        </Button>
      </FormGroup>
    </Box>
  );
}

export default EditProfile;
