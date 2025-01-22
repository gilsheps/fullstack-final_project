import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { getAllUsers, getPermissions } from "../utils/ManagementCompUtils";
import AddEditUserComp from "./addEditUserComp";
import TabManager from "../tabs/tabManager";
import { handleEditUser, handleDelteUser } from "./managementUserAction";

export default function ManagementComp({ activeTab, setActiveTab, editClick, setEditClick, returnActiveTab }) {
  const [mergeUsersAndPermissions, setMergeUsersAndPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAllUsers();
      setMergeUsersAndPermissions(data);
      const { data: permissions } = await getPermissions();
      setPermissions(permissions);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <TabManager
        tabs={[{ label: "All Movies" }, { label: `${editClick ? "Edit" : "Add"} User` }]}
        title={"Users"}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        editClick={editClick}
        setEditClick={setEditClick}
      />
      {activeTab === 0 && (
        <Box>
          {mergeUsersAndPermissions.map((user, index) => (
            <Box key={index} sx={{ mb: 2, textAlign: "left" }}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                  <Typography gutterBottom>
                    Name: {user.firstName} {user.lastName}
                  </Typography>
                  <Typography gutterBottom>User Name: {user.username}</Typography>
                  <Typography gutterBottom>Session Time Out (Minutes): {user.sessionTimeOut}</Typography>
                  <Typography gutterBottom>Created Date: {user.createDate}</Typography>
                  <Typography gutterBottom>Permissions: {user.permissions.join(", ")}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      onClick={(e) => handleEditUser(e, user, setUser, setEditClick, setActiveTab)}>
                      Edit
                    </Button>
                    <Button variant="contained" onClick={(e) => handleDelteUser(user)}>
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
      {activeTab === 1 &&
        (editClick ? (
          <AddEditUserComp user={user} permissions={permissions} returnActiveTab={returnActiveTab} />
        ) : (
          <AddEditUserComp permissions={permissions} returnActiveTab={returnActiveTab} />
        ))}
    </Box>
  );
}
