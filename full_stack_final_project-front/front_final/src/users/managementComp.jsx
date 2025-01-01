import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { getAllUsers, getPermissions } from "../utils/ManagementCompUtils";
import AddEditUserComp from "./addEditUserComp";

export default function ManagementComp() {
  const [mergeUsersAndPermissions, setMergeUsersAndPermissions] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [editClick, setEditClick] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [user, setUser] = useState({});
  // const [scrollPos, setScrollPos] = useState(0)
  // const handleScroll = () => setScrollPos(window.scrollY);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllUsers();
      // console.log("data", data);
      setMergeUsersAndPermissions(data);
      const { data: permissions } = await getPermissions();
      setPermissions(permissions);
    };
    fetchData().catch(console.error);
    if (editClick) {
      setEditClick(false);
    }
    // console.log("editClick", editClick);

    // window.addEventListener('scroll', handleScroll);
    // return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   // Scroll to the saved position
  //   window.scrollTo(0, scrollPos);
  //   console.log("scrollPos", scrollPos);
  // }, [scrollPos]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (editClick) {
      setEditClick(false);
    }
  };

  const returnActiveTab = () => {
    setActiveTab(0);
    setEditClick(false);
  };

  const handleEditUser = (e, user, index) => {
    e.preventDefault();
    setEditClick(true);
    setUser(user);
    setActiveTab(1);
    // window.removeEventListener('scroll', handleScroll)
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
        Users
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="All Users" />
        <Tab label={`${editClick ? "Edit" : "Add"} User`} />
      </Tabs>
      {activeTab === 0 && (
        <Box>
          {mergeUsersAndPermissions.map((user, index) => (
            <Box key={index} sx={{ mb: 2, textAlign: "left" }}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                  <Typography gutterBottom>
                    Name: {user.firstName} {user.lastName}
                  </Typography>
                  <Typography gutterBottom>
                    User Name: {user.username}
                  </Typography>
                  <Typography gutterBottom>
                    Session Time Out (Minutes): {user.sessionTimeOut}
                  </Typography>
                  <Typography gutterBottom>
                    Created Date: {user.createDate}
                  </Typography>
                  <Typography gutterBottom>
                    Permissions: {user.permissions.join(", ")}
                  </Typography>
                  {/* Buttons */}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      onClick={(e) => handleEditUser(e, user)}
                    >
                      Edit
                    </Button>
                    <Button variant="contained">Delete</Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
      {activeTab === 1 &&
        (editClick ? (
          <AddEditUserComp
            user={user}
            permissions={permissions}
            returnActiveTab={returnActiveTab}
          />
        ) : (
          <AddEditUserComp
            permissions={permissions}
            returnActiveTab={returnActiveTab}
          />
        ))}
    </Box>
  );
}
