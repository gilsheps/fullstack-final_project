import React, { useState } from "react";
import {
  Box, TextField,
  Typography, Button
} from "@mui/material";
import api from "../utils/api";

export default function AddOrEditMemberComp({ member, returnActiveTab }) {
  const [updateMember, setUpdatemember] = useState({ ...member });


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit", updateMember);
    delete updateMember._id;
    try {
      const { data } = member
        ? await api.put(`/members/${member._id}`, { updateMember })
        : await api.post("/members/", { updateMember });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    updateMember[e.target.id.split("-")[1]] = e.target.value;
  };
  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h6" gutterBottom>
        {member?.name ? `Edit Member: ${member?.name}` : "Add New Member"}
      </Typography>
      <Box
        sx={{
          pt: 3,
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          width: "40ch",
          gap: 2,
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-name"
          label="Name:"
          name="standard-name"
          defaultValue={member?.name || ""}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id="standard-email"
          label="Email:"
          name="standard-email"
          defaultValue={member?.email || ""}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id="standard-city"
          label="City"
          name="standard-city"
          defaultValue={member?.city || ""}
          onChange={(e) => handleChange(e)}
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ mr: 1 }} type="submit">
            {member ? "Update" : "Save"}
          </Button>
          <Button variant="contained" onClick={returnActiveTab}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
