import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function MembersComp({ members }) {
  useEffect(() => {
    members.map((member) => {
      console.log("members", member);
    });
  }, []);

  return (
    <>
      {members.length > 0 ? (
        members.map((movie, member, index) => {
          <Box key={movie._id}>
            <Typography variant="h1" sx={{ fontWeight: "bold" }}>
              {member.name}
            </Typography>
          </Box>;
        })
      ) : (
        <></>
      )}
    </>
  );
}
