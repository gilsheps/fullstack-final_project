import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
  Link,
} from "@mui/material";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import dayjs from "dayjs";

export default function UsersListComp({ userList, handleClick, setValue }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      name="box_list"
    >
      {userList.map((item, index) => {
        return (
          <List key={index}>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                name="box_listitem"
              >
                <ListItemIcon>
                  <CircleRoundedIcon
                    sx={{
                      color: "black",
                      fontSize: 15,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Button
                      onClick={(e) => handleClick(e, setValue)}
                      component={Link}
                      href="#"
                    >
                      {item.name}
                    </Button>
                  }
                  secondary={dayjs(item.date).format("DD/MM/YYYY")}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: 300,
                  }}
                />
              </Box>
            </ListItem>
          </List>
        );
      })}
    </Box>
  );
}
