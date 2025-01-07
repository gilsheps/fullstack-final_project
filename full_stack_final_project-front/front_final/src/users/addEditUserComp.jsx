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
import api from "../utils/api.js";


export default function AddEditUserComp({
  user,
  permissions,
  returnActiveTab,
}) {
  const [checked, setChecked] = useState([]);
  const [value, setValue] = useState(dayjs(user?.createDate));
  const [updateUser, setUpdateUser] = useState({ ...user });
  const [formValues, setFormValues] = useState({});
  const [currentPermission, setCurrentPermission] = useState("");
  let viewPermission = permissions[0];

  useEffect(() => {
    const userPermissions = [];
    user?.permissions.map((permission) => {
      userPermissions.push(permission);
    });
    setChecked(userPermissions);
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    updateUser["permissions"] = checked;
    console.log("useEffect", updateUser);
  }, [checked]);

  const handleToggle = (permission) => () => {
    console.log("handleToggle", permission);
    if (permission === viewPermission && checked.length > 0) {
      return setChecked([...checked, viewPermission]);
    } else if (
      permission.includes("Subscriptions") &&
      !checked.includes(viewPermission)
    ) {
      return setChecked([...checked, permission, viewPermission]);
    }
    setChecked((prev) => {
      if (prev.includes(permission)) {
        return prev.filter((item) => item !== permission);
      } else {
        return [...prev, permission];
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    updateUser[e.target.id.split("-")[1]] = e.target.value;
  };
  const handlPickerChange = (newValue) => {
    setValue(newValue);
    updateUser["createDate"] = dayjs(newValue.$d).format("YYYY-MM-DD");
    console.log("handlPickerChange", updateUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit", updateUser);
    const { data } = user
      ? await api.put(`/users/${user.id}`, { updateUser })
      : await api.post("/users/", { updateUser });
    console.log(data)
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
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-firstName"
          label="First Name:"
          name="standard-firstName"
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
          <List sx={{ width: "100%", maxWidth: 360 }} id="list-heloo">
            {permissions?.map((permission, index) => {
              return (
                <ListItemButton
                  key={index}
                  id={`btn-list-heloo`}
                  role={undefined}
                  onClick={handleToggle(permission)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
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
          <Button variant="contained" sx={{ mr: 1 }} type="submit">
            {user ? "Update" : "Save"}
          </Button>
          <Button variant="contained" onClick={returnActiveTab}>
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
}
