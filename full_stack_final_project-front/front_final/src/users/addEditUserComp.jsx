import React from "react";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function AddEditUserComp({
  user,
  permissions,
  returnActiveTab,
}) {
  const [checked, setChecked] = useState([]);
  const [value, setValue] = useState(dayjs(user?.createDate));
  const [updateUser, setUpdateUser] = useState({ ...user });

  useEffect(() => {
    const userPermissions = [];
    user?.permissions.map((permission) => {
      userPermissions.push(permission);
    });
    setChecked(userPermissions);
  }, [user]);

  // useEffect(() => {
  //   console.log("useEffect", checked);

  //     // ? setChecked([...checked,'View Subscriptions'])
  //     // : ""
  //   // checked.includes('Subscriptions') ? console.log('checked') : console.log('not checked')
  //   // setChecked([...checked,'View Subscriptions']) : setChecked(['View Subscriptions'])
  //   return () => true
  // }, [checked]);

  const handleToggle = (e, permission) => () => {
    // if (checked.length === 0 && permission.includes("Subscriptions")) {
    //   setChecked([...checked, "View Subscriptions", permission]);
    //   // ? setChecked(["View Subscriptions"])
    //   // : setChecked([permission]);
    // } else {
    //   setChecked((prev) =>
    //     console.log("prev", prev) || prev.includes(permission)
    //       ? prev.filter((item) => item !== permission)
    //       : [...prev, permission]
    //   );
    // }
    console.log(e);
    setChecked((prev) =>
      console.log("prev", prev) || prev.includes(permission)
        ? prev.filter((item) => item !== permission)
        : [...prev, permission]
    );
    console.log("checked", checked);
  };

  const handleChange = (e) => {
    updateUser[e.target.id.split("-")[1]] = e.target.value;
    console.log("handleChange", updateUser);
  };
  const handlPickerChange = (newValue) => {
    setValue(newValue);
    updateUser["createDate"] = dayjs(newValue.$d).format("YYYY-MM-DD");
    console.log("handlPickerChange", updateUser);
  };
  return (
    <>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="h6" gutterBottom>
          {user?.firstName
            ? `Edit User: ${user?.firstName} ${user?.lastName}`
            : "Add New User"}
        </Typography>
      </Box>
      <Box
        sx={{
          pt: 3,
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          width: "40ch",
          gap: 2,
        }}
      >
        <TextField
          id="standard-firstName"
          label="First Name:"
          defaultValue={user?.firstName || ""}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id="standard-lastName"
          label="Last Name:"
          defaultValue={user?.lastName || ""}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id="standard-username"
          label="User Name:"
          defaultValue={user?.username || ""}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id="standard-sessionTimeOut"
          label="Session Time Out (Minutes):"
          defaultValue={user?.sessionTimeOut || ""}
          type="number"
          onChange={(e) => handleChange(e)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Created date:"
            defaultValue={value}
            onChange={(e, newValue) => handlPickerChange(e, newValue)}
            slotProps={{
              textField: {
                id: "standard-createDate",
              },
            }}
          />
        </LocalizationProvider>
        <Box>
          <Typography gutterBottom>Permissions:</Typography>
          <List sx={{ width: "100%", maxWidth: 360 }}>
            {permissions?.map((permission, index) => {
              return (
                <ListItemButton
                  key={index}
                  role={undefined}
                  id={`btn-${index}`}
                  onClick={(e) => console.log(e.target)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      id={`btn-${index}`}
                      checked={checked.includes(permission)}
                      tabIndex={-1}
                      disableRipple
                      
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={`btn-${index}`}
                    name={`btn-${index}`}
                    primary={permission}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ mr: 1 }}>
            Update
          </Button>
          <Button variant="contained" onClick={returnActiveTab}>
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
}
