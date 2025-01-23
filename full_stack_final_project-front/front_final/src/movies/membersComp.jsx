import React from "react";
import { Box, Typography } from "@mui/material";

export default function MembersComp({ members }) {

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
